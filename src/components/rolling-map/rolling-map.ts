import {Component, Input} from "@angular/core";
import {Location, LocationService, OutingView, PathService} from "front-end-common";
import * as L from "leaflet";
import {GameState} from "../../providers/game-state/game-state";
import {GuideEventService} from "../../providers/guide-event-service/guide-event-service";
import {LoadStateService} from "../../providers/load-state/load-state.service";
import {NavController} from "ionic-angular";

@Component({
  selector: 'rolling-map',
  templateUrl: 'rolling-map.html',
})
export class RollingMapComponent {

  @Input() outing: OutingView;
  @Input() gameState: GameState;
  @Input() navCtrl: NavController;
  map: any;
  zoomLevel: number = 14;
  edgeLayer: any;

  private greenLine = {
    color: "#007700",
    weight: 5,
    opacity: .75
  };

  private blueLine = {
    color: "#4040CC",
    weight: 5,
    opacity: .65
  };
  private firstTimeThrough: boolean = true;

  constructor(
    private guideEventService: GuideEventService,
    private pathService: PathService,
    private locationService: LocationService,
    private loadStateService: LoadStateService,
  ) {
    console.log('Hello RollingMapComponent Component');
  }

  ngOnInit(): void {
    console.log('RollingMapComponent ngOnInit()');
  }

  public prepareRollingMap() {
    let startingLocation: Location = this.locationService.getVisibleLocations(0)[0];
    this.map = L.map('rolling-map');

    /* Temporary just to get the map in the ball-park of the track I've pulled in. */
    let leafletPosition = [
      startingLocation.latLon.lat,
      startingLocation.latLon.lon
    ];

    this.map.setView(leafletPosition, this.zoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    /* Providing a layer upon which we pile on the stuff we show the user should be easier this way. */
    this.edgeLayer = L.geoJSON().addTo(this.map);

    /* When changes come in, we throw them into the layer. */
    if (this.gameState && this.gameState.pathIndex >= 0) {
      console.log("Rolling Map: ngOnInit placing path");
      this.pathService.getPathGeoJsonByIndex(this.gameState.pathIndex).subscribe(
        (path) => {
          this.edgeLayer.addData(path);
        }
      );
    } else {
      // this.addLocationToMap(startingLocation);
      this.addMarkerForLocation(startingLocation);
    }

  }

  ngOnChanges(changes) {
    console.log("rolling-map component: ngOnChanges()");
    if (!this.loadStateService.isLoadComplete()) {
      console.log("Waiting for Load to Complete");
      return;
    }
    if (changes.memberId) {
      console.log("rolling-map component: Member ID has changed");
      console.log("previous: " + changes.memberId.previousValue);
      console.log("current: " + changes.memberId.currentValue);
    }
    if (changes.gameState) {
      console.log("rolling-map component: Game State has changed");
      console.log("previous: " + changes.gameState.previousValue);
      console.log("current: " + changes.gameState.currentValue);
    }

    if (!changes.gameState) return;

    if ( this.firstTimeThrough
      && this.loadStateService.isLoadComplete()
    ) {
      this.prepareRollingMap();
      this.firstTimeThrough = false;
    }

    /* When changes come in, we throw them into the layer. */
    if (this.gameState) {
      this.updatePathsOnMap();
    } else {
      console.log('No Game State yet');
    }

  }

  private updatePathsOnMap() {
    console.log("State change to path index " + this.gameState.pathIndex);
    if (this.gameState.pathIndex < 0) return;
    for (let i = 0; i <= this.gameState.pathIndex; i++) {
      console.log("ngOnChange: loading path for index " + i);
      /* TODO: Should be able to cache these. */
      this.pathService.getPathGeoJsonByIndex(i).subscribe(
        (path) => {
          let pathColor = this.blueLine;

          /* Adjust color of last path added. */
          if (i == this.gameState.pathIndex) {
            pathColor = this.greenLine;
          }

          let styledPath = L.geoJSON(path.features, {
            style: pathColor
          });

          styledPath.addTo(this.map);

          /* Adjust map zoom/center to fit the last path added. */
          if (i == this.gameState.pathIndex) {
            this.map.fitBounds(styledPath.getBounds().pad(.2));
          }
        }
      );
    }

    /* Add Locations to the Map. */
    let locationList: Location[] = this.locationService
      .getVisibleLocations(this.gameState.pathIndex);

    for (let locationIndex in locationList) {
      let location = locationList[locationIndex];
      // this.addLocationToMap(location);
      this.addMarkerForLocation(location);
    }

  }

  /**
   * Left as an example of adding a location without a marker using L.geoJSON method.
   * @param location
   */
  public addLocationToMap(location) {
    let locationPointFeature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.latLon.lon, location.latLon.lat]
      }
    };

    L.geoJSON(locationPointFeature).addTo(this.map);
  }

  /**
   * Places a Marker that carries the Location ID and the
   * location's name.
   * @param location to be placed on map.
   */
  private addMarkerForLocation(location: Location) {
    /* Adding the right color and icon goes here. */
    let marker: L.marker = L.marker(
      L.latLng(location.latLon),
      {
        id: location.id,
        title: location.name,
        navCtrl: this.navCtrl,
      }
    );

    marker.on('click', this.onLocationMarker);

    marker.addTo(this.edgeLayer);
  }

  public onLocationMarker(e) {
    let details = e.target.options;
    details.navCtrl.push("LocationPage", {'id': details.id });
  }

  /* Cleanup after ourselves. */
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  public signalArrival() {
    this.guideEventService.sendArrival();
  }
}
