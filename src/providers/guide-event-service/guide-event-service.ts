import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  BASE_URL,
  OutingService,
  ProfileService,
  TokenService
} from "front-end-common";

/**
 * Service for sending the Guide Events to the SSE Server.
 */
@Injectable()
export class GuideEventService {

  private httpOptions;

  constructor(
    public http: HttpClient,
    private profileService: ProfileService,
    private outingService: OutingService,
    private tokenService: TokenService,
  ) {
    console.log('Hello GuideEventService Provider');
    this.httpOptions = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.getBearerToken()
    })
  }

  public sendArrival() {
    this.http.post(
      BASE_URL + 'game-state/arrival',
      null,
      {
        headers: this.httpOptions
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
        headers: this.httpOptions
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
        headers: this.httpOptions
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
