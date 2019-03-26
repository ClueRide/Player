import {Component} from "@angular/core";
import {GameState} from "../../providers/game-state/game-state";
import {GuideEventService} from "../../providers/guide-event-service/guide-event-service";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import * as L from "leaflet";
import {Attraction, AttractionService, OutingService, OutingView, Path, PathService} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {from} from "rxjs/observable/from";
import {range} from "rxjs/observable/range";
import {tap} from "rxjs/operators/tap";

const GREEN_LINE = {
  color: "#00AA00",
  weight: 5,
  opacity: .75
};

const BLUE_LINE = {
  color: "#4040FF",
  weight: 5,
  opacity: .65
};

/**
 * Presents the map for the game while "Rolling".
 */
@IonicPage()
@Component({
  selector: 'page-rolling',
  templateUrl: 'rolling.html',
})
export class RollingPage {
  map: any;
  edgeLayer: any;

  outing: OutingView;
  gameState: GameState;
  zoomLevel: number = 14;

  constructor(
    private attractionService: AttractionService,
    public outingService: OutingService,
    public titleService: Title,
    private guideEventService: GuideEventService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private pathService: PathService,
  ) {
    console.log("Hello RollingPage");
    this.gameState = navParams.get('gameState');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit RollingPage');

    this.outingService.getSessionOuting().subscribe(
      (outing) => {
        this.outing = outing;
      }
    );

    this.map = L.map('rolling-map');
    this.prepareRollingMap();
    this.updatePathsOnMap(this.gameState);
  }

  ionViewDidEnter() {
    console.log("RollingPage.ionViewDidEnter");
    this.titleService.setTitle("Rolling");
  }

  public prepareRollingMap() {
    let startingAttraction: Attraction = this.attractionService.getVisibleAttractions(0)[0];

    /* Temporary just to get the map in the ball-park of the track I've pulled in. */
    let leafletPosition = [
      startingAttraction.latLon.lat,
      startingAttraction.latLon.lon
    ];

    this.map.setView(leafletPosition, this.zoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    /* Providing a layer upon which we pile on the stuff we show the user should be easier this way. */
    this.edgeLayer = L.geoJSON().addTo(this.map);

    if (!this.gameState || this.gameState.pathIndex < 0) {
      this.addMarkerForAttraction(startingAttraction);
    }

  }

  /**
   * Draw all the cached paths up to our current attraction along with those attractions.
   * History paths are a different color from the current path.
   */
  private updatePathsOnMap(gameState: GameState) {
    if (gameState.pathIndex < 0) {
      console.log("Outing has not yet begun rolling");
      return;
    }

    const addCurrentPathToMap = tap((path: Path) => {
        let styledPath = L.geoJSON(path.features, {
          style: GREEN_LINE
        });
        styledPath.addTo(this.map);
        /* Adjust map zoom/center to fit the last path added. */
        this.map.fitBounds(styledPath.getBounds().pad(.2));
      }
    );

    console.log("Path index " + gameState.pathIndex);

    /* Because we start at zero, we have to run for one more than the current index. */
    range(0, gameState.pathIndex+1)
      .map((pathIndex: number): Path => this.pathService.getPathGeoJsonByIndex(pathIndex))
      .do(
        /* Adds history line to the map. */
        (path: Path) => {
          L.geoJSON(
            path.features, {
              style: BLUE_LINE,
            }
          ).addTo(this.map)
        }
      ).last().pipe(addCurrentPathToMap)
      .subscribe();

    /* Add Attractions to the Map. */
    from(this.attractionService.getVisibleAttractions(gameState.pathIndex))
      .do(attraction => this.addMarkerForAttraction(attraction))
      .subscribe();

  }

  /**
   * Places a Marker that carries the Attraction ID and the
   * attraction's name.
   * @param attraction to be placed on map.
   */
  private addMarkerForAttraction(attraction: Attraction) {
    /* Adding the right color and icon goes here. */
    let marker: L.marker = L.marker(
      L.latLng(attraction.latLon),
      {
        id: attraction.id,
        title: attraction.name,
        navCtrl: this.navCtrl,
      }
    );

    marker.on('click', RollingPage.onAttractionMarker);

    marker.addTo(this.edgeLayer);
  }

  private static onAttractionMarker(e) {
    let details = e.target.options;
    details.navCtrl.push("LocationPage", {'id': details.id });
  }

  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  public signalArrival() {
    this.guideEventService.sendArrival();
  }

}
