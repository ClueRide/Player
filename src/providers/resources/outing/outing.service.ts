import {Inject, Injectable} from "@angular/core";
import {OUTING_REST} from "./outing.service.provider";

/**
 * Created by jett on 7/22/17.
 */

@Injectable()
export class OutingService {

  constructor(
    @Inject(OUTING_REST) private resource
  ) {
  }

  get(params: any) {
    return this.resource.get(params);
  }

}
