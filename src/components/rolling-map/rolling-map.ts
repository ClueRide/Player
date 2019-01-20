import {Component, Input} from "@angular/core";
import {GuideEventServiceProvider} from "../../providers/resources/guide-events/guide-event.service.provider";
import {GuideEventService} from "../../providers/resources/guide-events/guide-event.service";
import {PathService, OutingView} from "../../../../front-end-common/index";

import * as L from "leaflet";

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
  map: any;
  zoomLevel: number = 14;
  edgeLayer: any;

  constructor(
    private guideEventService: GuideEventService,
    // private edgeService: EdgeService,
    private pathService: PathService,
  ) {
    console.log('Hello RollingMapComponent Component');
  }

  ngOnInit(): void {
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
    this.pathService.getPathGeoJson(13).subscribe(
      (path) => {
        this.edgeLayer.addData(path);
      }
    );

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
