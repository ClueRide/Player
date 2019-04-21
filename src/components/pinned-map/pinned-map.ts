import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LatLon} from "../lat-lon";
import * as L from "leaflet";
import {Attraction} from "front-end-common";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {MarkerService} from "../../providers/marker-service/marker-service";
import {NavController} from "ionic-angular";

/**
 * Provides a simple map showing Attraction(s) provided via
 * the 'startingLocationObservable'.
 */
@Component({
  selector: 'pinned-map',
  templateUrl: 'pinned-map.html'
})
export class PinnedMapComponent implements OnInit, OnDestroy {

  @Input() startingLocationObservable: Observable<Attraction>;
  @Input() pin: LatLon;
  map: any;
  zoomLevel = 14;
  subscription: Subscription;
  loading: boolean;

  constructor(
    private markerService: MarkerService,
    private navCtrl: NavController,
  ) {
    this.subscription = new Subscription();
    this.loading = true;
  }

  ngOnInit(): void {
    this.map = L.map('pinned-map');

    let leafletPosition = [
      this.pin.lat,
      this.pin.lon
    ];

    this.map.setView(leafletPosition, this.zoomLevel);

    /* Specify the tile layer for the map and add the attribution. */
    let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    tileLayer.on('tileload', () => this.loading = false);

    /* Setup the starting Attraction. */
    this.subscription.add(
      this.startingLocationObservable
        .subscribe(
          (attraction: Attraction) => {
            this.markerService.generateAttractionMarker(
              attraction,
              this.navCtrl
            ).addTo(this.map);
          }
        )
    );

  }

  /* Cleanup after ourselves. */
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }

    this.subscription.unsubscribe();
  }

}
