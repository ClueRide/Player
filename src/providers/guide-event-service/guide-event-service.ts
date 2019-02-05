import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  BASE_URL,
  OutingService,
  ProfileService,
  HttpService
} from "front-end-common";

/**
 * Service for sending the Guide Events to the SSE Server.
 */
@Injectable()
export class GuideEventService {

  constructor(
    public http: HttpClient,
    private profileService: ProfileService,
    private outingService: OutingService,
    private httpService: HttpService,
  ) {
    console.log('Hello GuideEventService Provider');
  }

  public sendArrival() {
    this.http.post(
      BASE_URL + 'game-state/arrival',
      null,
      {
        headers: this.httpService.getAuthHeaders()
      }
    ).subscribe(
      () => {
        console.log("Arrival Message is Sent");
      }
    );
  }

  public sendDeparture() {
    this.http.post(
      BASE_URL + 'game-state/departure',
      null,
      {
        headers: this.httpService.getAuthHeaders()
      }
    ).subscribe(
      () => {
        console.log("Departure Message is Sent");
      }
    );
  }

  public sendTeamAssembled() {
    this.http.post(
      BASE_URL + 'game-state/team-assembled',
      null,
      {
        headers: this.httpService.getAuthHeaders()
      }
    ).subscribe(
      () => {
        console.log("Team Assembled Message is Sent");
      }
    );
  }

  /* Bases decision on comparison of current Member ID and the Guide's Member ID for the outing. */
  isCurrentMemberGuide() {
    let currentMemberId = this.profileService.getCurrentMemberId();
    let guideMemberId = this.outingService.getGuideMemberId();
    return currentMemberId === guideMemberId;
  }

}
