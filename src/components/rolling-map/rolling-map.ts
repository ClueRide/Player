import {Component, Input} from "@angular/core";
import {Outing} from "../../providers/resources/outing/outing";
import {GuideEventServiceProvider} from "../../providers/resources/guide-events/guide-event.service.provider";
import {GuideEventService} from "../../providers/resources/guide-events/guide-event.service";

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
  @Input() outing: Outing;

  constructor(
    private guideEventService: GuideEventService
  ) {
    console.log('Hello RollingMapComponent Component');
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
