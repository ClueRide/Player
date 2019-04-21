import {Injectable} from '@angular/core';
import * as L from "leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";
import {LocationPage} from "../../pages/location/location";
import {Attraction} from "front-end-common";
import {NavController} from "ionic-angular";

/**
 * This list of valid marker colors is taken from the leaflet.awesome-markers github README:
 * https://github.com/lvoogdt/Leaflet.awesome-markers
 */
export type MarkerColor =
  'red'
  | 'darkred'
  | 'orange'
  | 'green'
  | 'darkgreen'
  | 'blue'
  | 'purple'
  | 'darkpurple'
  | 'cadetblue';

/**
 * Creates the markers used in Clue Ride Player module.
 *
 * This is based on the leaflet.AwesomeMarkers and supports
 * both ionicons and Font Awesome Icons. For these to show up,
 * the CSS must be included in the application (index.html) and
 * for the markers themselves, there are a set of image resources
 * that need to be copied from the distribution into the application.
 *
 * There is also a bit of CSS that needs to be named as SASS/SCSS
 * as described in the README.md for the
 */
@Injectable()
export class MarkerService {

  currentAttractionIcon: L.AwesomeMarkers.Icon;
  defaultAttractionIcon: L.AwesomeMarkers.Icon;
  nextAttractionIcon: L.AwesomeMarkers.Icon;
  monumentIcon: L.AwesomeMarkers.Icon;

  constructor() {
    this.currentAttractionIcon = L.AwesomeMarkers.icon(
      {
        icon: 'play',
        markerColor: 'green',
        prefix: 'ion-md'
      }
    );

    this.nextAttractionIcon = L.AwesomeMarkers.icon(
      {
        icon: 'lock',
        markerColor: 'red',
        prefix: 'fa'
      }
    );

    this.defaultAttractionIcon = L.AwesomeMarkers.icon(
      {
        icon: 'lock-open',
        markerColor: 'darkblue',
        prefix: 'fa'
      }
    );

    this.monumentIcon = MarkerService.createIcon(
      'monument',
      'fa',
      'darkpurple'
    );

  }

  static createIcon(
    iconName: string = 'flag',
    prefix: 'ion' | 'fa' = 'fa',
    markerColor: MarkerColor = 'blue'
  ): L.AwesomeMarkers.Icon {
    return new L.AwesomeMarkers.icon(
      {
        icon: iconName,
        prefix: prefix,
        markerColor: markerColor
      }
    );
  }

  generateAttractionMarker(
    attraction: Attraction,
    navCtrl: NavController
  ): L.marker {
    /* Adding the right color and icon goes here. */
    let marker: L.marker = L.marker(
      L.latLng(attraction.latLon),
      {
        id: attraction.id,
        title: attraction.name,
        navCtrl: navCtrl,
        icon: this.selectMarkerIcon(attraction),
      }
    );

    /* What to do when user clicks on the attraction. */
    MarkerService.setOnClickToLocationPage(marker);

    return marker;
  }

  selectMarkerIcon(attraction: Attraction): L.AwesomeMarker.Icon {
    if (attraction.isLast) return this.nextAttractionIcon;
    if (attraction.isCurrent) return this.currentAttractionIcon;
    return this.defaultAttractionIcon;
  }

  /**
   * For the given marker, set the OnClick response to push the Location Page
   * for the Attraction ID carried by the marker.
   *
   * Exception is thrown if the marker doesn't carry the `id` property.
   *
   * @param marker Leaflet marker with additional attribute for the attraction ID.
   */
  static setOnClickToLocationPage(marker: L.marker): void {
    if (!marker.options.id) {
      console.error("Marker without Attraction ID");
      throw {
        error: "setOnClickToLocationPage: marker doesn't have an attraction ID"
      }
    }
    marker.on('click', MarkerService.onAttractionMarker);
  }

  /** Response to clicks on the attraction's marker: show the attraction's page. */
  private static onAttractionMarker(e) {
    let details = e.target.options;
    details.navCtrl.push(LocationPage, {'id': details.id });
  }

}
