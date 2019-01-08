import {Component, Input} from '@angular/core';
import {LatLon} from "../lat-lon";
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

  @Input() pin: LatLon;
  map: any;
  zoomLevel = 14;

  constructor() {
  }

  ngOnInit(): void {
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
    if (this.map) {
      this.map.remove();
    }
  }

}
