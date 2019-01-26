import {Component, Input} from "@angular/core";
import {GuideEventServiceProvider} from "../../providers/resources/guide-events/guide-event.service.provider";
import {GuideEventService} from "../../providers/resources/guide-events/guide-event.service";
import {PathService, OutingView} from "../../../../front-end-common/index";

import * as L from "leaflet";
import {GameState} from "../../providers/game-state/game-state";

@Component({
  selector: 'rolling-map',
  templateUrl: 'rolling-map.html',
  providers: [
    GuideEventService,
    GuideEventServiceProvider
  ]
})
export class RollingMapComponent {

  @Input() memberId: Number;
  @Input() outing: OutingView;
  @Input() gameState: GameState;
  map: any;
  zoomLevel: number = 14;
  edgeLayer: any;

  dummyCourse = {
    pathIds: []
  }

  constructor(
    private guideEventService: GuideEventService,
    private pathService: PathService,
  ) {
    console.log('Hello RollingMapComponent Component');
    // this.dummyCourse.pathIds.push(12);
    // this.dummyCourse.pathIds.push(7);
    // this.dummyCourse.pathIds.push(5);
    // this.dummyCourse.pathIds.push(8);

    this.dummyCourse.pathIds.push(6);
    this.dummyCourse.pathIds.push(4);
    this.dummyCourse.pathIds.push(3);
    this.dummyCourse.pathIds.push(13);
    this.dummyCourse.pathIds.push(9);
    this.dummyCourse.pathIds.push(10);
    this.dummyCourse.pathIds.push(2);

  }

  ngOnInit(): void {
    if (this.map) {
      return;
    }

    this.map = L.map('rolling-map');

    /* Temporary just to get the map in the ball-park of the track I've pulled in. */
    let leafletPosition = [
      33.76,
      -84.38
    ];

    this.map.setView(leafletPosition, this.zoomLevel);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    /* Providing a layer upon which we pile on the stuff we show the user should be easier this way. */
    this.edgeLayer = L.geoJSON().addTo(this.map);

    /* When changes come in, we throw them into the layer. */
    if (this.gameState) {
      this.pathService.getPathGeoJson(this.dummyCourse.pathIds[this.gameState.pathIndex]).subscribe(
        (path) => {
          this.edgeLayer.addData(path);
        }
      );
    }

  }

  ngOnChanges(changes) {
    console.log("rolling-map component: ngOnChanges()");
    if (changes.outing) {
      console.log("rolling-map component: Outing has changed");
      console.log("previous: " + changes.outing.previousValue);
      console.log("current: " + changes.outing.currentValue);
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


    /* When changes come in, we throw them into the layer. */
    if (this.gameState) {
      console.log("State change to path index " + this.gameState.pathIndex);
      this.pathService.getPathGeoJson(this.dummyCourse.pathIds[this.gameState.pathIndex]).subscribe(
        (path) => {
          this.edgeLayer.addData(path);
        }
      );
    } else {
      console.log('No Game State yet');
    }

  }

  /* Cleanup after ourselves. */
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  public isGuide(): boolean {
    return this.memberId
      && this.outing
      && this.outing.guideMemberId
      && this.outing.guideMemberId === this.memberId;
  }

  public signalArrival() {
    this.guideEventService.arrival({});
  }

}
