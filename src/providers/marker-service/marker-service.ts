import {Injectable} from '@angular/core';
import * as L from "leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";

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

}
