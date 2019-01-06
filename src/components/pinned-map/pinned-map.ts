import {Component, Input} from '@angular/core';
import {LatLon} from "../lat-lon";
import {Observable} from "rxjs/Observable";
import * as L from "leaflet";

/**
 * Generated class for the PinnedMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pinned-map',
  templateUrl: 'pinned-map.html'
})
export class PinnedMapComponent {

  @Input() pinObservable: Observable<LatLon>;
  pin: LatLon = new LatLon();
  map: any;
  zoomLevel = 14;

  constructor() {
  }

  ngOnInit(): void {
    /* postpone showing the map until the position comes back from the server. */
    this.pinObservable.subscribe(
      (latLon) => {
        this.pin.lat = latLon.lat;
        this.pin.lon = latLon.lon;
        this.pin.lng = latLon.lon;
        this.pin.id = latLon.id;
        this.showMap();
      }
    );
  }

  /**
   * Build the map and open to the position defined by the 'pin'.
   */
  showMap(): void {
    this.map = L.map('pinned-map');

    let leafletPosition = [
      this.pin.lat,
      this.pin.lon
    ];

    this.map.setView(leafletPosition, this.zoomLevel);

    /* Specify the tile layer for the map and add the attribution. */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    L.marker(leafletPosition).addTo(this.map);
  }

  /* Cleanup after ourselves. */
  ngOnDestroy(): void {
    this.map.remove();
  }

}
