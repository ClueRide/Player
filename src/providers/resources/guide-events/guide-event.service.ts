import {Inject, Injectable} from "@angular/core";
import {GUIDE_EVENT_REST} from "./guide-event.service.provider";

/**
 * Created by jett on 7/22/17.
 */

@Injectable()
export class GuideEventService {

  constructor(
    @Inject(GUIDE_EVENT_REST) private resource
  ) {
  }

  arrival(params: any) {
    return this.resource.arrival(params);
  }

  departure(params: any) {
    return this.resource.departure(params);
  }

  teamAssembled(params: any) {
    return this.resource.teamAssembled(params);
  }

}
