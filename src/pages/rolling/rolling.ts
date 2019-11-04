import {Component} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {Attraction, AttractionService, OutingService, OutingView, Path, PathService} from "front-end-common";
import {IonicPage, NavController} from "ionic-angular";
import * as L from "leaflet";
import {from} from "rxjs/observable/from";
import {range} from "rxjs/observable/range";
import {tap} from "rxjs/operators/tap";
import {GameState} from "../../providers/game-state/game-state";
import {GameStateService} from "../../providers/game-state/game-state.service";
import {GuideEventService} from "../../providers/guide-event-service/guide-event-service";
import {MarkerService} from "../../providers/marker-service/marker-service";

const GREEN_LINE = {
  color: "#00FF00",
  weight: 6,
  opacity: .75
};

const BLUE_LINE = {
  color: "#4040FF",
  weight: 4,
  opacity: .55
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
  title: string = '';

  /* Public members. */
  outing: OutingView;
  gameState: GameState;
  zoomLevel: number = 14;

  constructor(
    private attractionService: AttractionService,
    private outingService: OutingService,
    private titleService: Title,
    private gameStateService: GameStateService,
    private guideEventService: GuideEventService,
    private navCtrl: NavController,
    private pathService: PathService,
    private markerService: MarkerService,
  ) {
    console.log("Hello RollingPage");
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
    this.gameStateService.requestGameState()
      .subscribe(
        (gameState) => {
          this.gameState = gameState;
          this.updatePathsOnMap(this.gameState);
        }
      );
  }

  ionViewDidEnter() {
    console.log("RollingPage.ionViewDidEnter");
    switch (this.gameStateService.getOutingState()) {
      case 'PENDING_ARRIVAL':
        this.title = 'Start Location';
        break;

      case 'IN_PROGRESS':
      default:
        this.title = 'Rolling';
        break;

      case 'COMPLETE':
        this.title = 'Game Complete';
        break;
    }
    this.titleService.setTitle(this.title);

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
   * Places a Marker that carries the Attraction ID and the attraction's name.
   *
   * @param attraction Attraction to be placed on map.
   */
  private addMarkerForAttraction(
    attraction: Attraction
  ) {
    let marker = this.markerService.generateAttractionMarker(
      attraction,
      this.navCtrl
    );

    marker.addTo(this.edgeLayer);
  }

  /**
   * Tells whether the current session is associated with a Guide.
   */
  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  public isGameStarted(): boolean {
    return this.gameStateService.isGameStarted();
  }

  public signalArrival() {
    this.guideEventService.sendArrival();
  }

}
