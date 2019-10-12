import {AnswerSummary} from "../answer-summary/answer-summary";
import {BadgeEvent} from "../../components/badge-event/badge-event";
import {EventSourcePolyfill, OnMessageEvent} from "ng-event-source";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {TokenService, ProfileService} from "front-end-common";

const gameStateUrl: string = 'http://sse.clueride.com/game-state-broadcast';

/**
 * Handles subscription to Server-Sent events (SSE) such as Game State transitions.
*/
@Injectable()
export class ServerEventsService {

  private eventSource: EventSourcePolyfill;

  private answerSummary$: Subject<OnMessageEvent>;
  readonly badgeEvent$: Subject<string>;
  private gameStateEvent$: Subject<OnMessageEvent>;
  private tetherEvent$: Subject<OnMessageEvent>;

  constructor(
    private tokenService: TokenService,
    private profileService: ProfileService,
  ) {
    this.answerSummary$ = new Subject<OnMessageEvent>();
    this.badgeEvent$ = new Subject<string>();
    this.gameStateEvent$ = new Subject<OnMessageEvent>();
    this.tetherEvent$ = new Subject<OnMessageEvent>();
  }

  /**
   * Handles life-cycle for Game State events on the channel for the given Outing ID.
   *
   * All Messages are forwarded to the GameStateService for triggering UI changes.
   * @param outingId
   */
  public initializeSubscriptions(outingId: number): void {

    if (!this.eventSource) {
      let bearerToken = this.tokenService.getBearerToken();

      console.log("Opening Event Source");
      this.eventSource = new EventSourcePolyfill(
        gameStateUrl + "/" + outingId,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        }
      );

      /* All custom message types fire the `onmessage` event for our chosen EventSource polyfill. */
      this.eventSource.onmessage = (
        (messageEvent: MessageEvent) => {
          console.log("SSE Message (type " + messageEvent.type + "): " + JSON.stringify(messageEvent.data));
          /* Handle the various Named Messages. */
          if (messageEvent.type === "tether") {
            this.tetherEvent$.next(messageEvent);
          } else if (messageEvent.type === "message" || messageEvent.type === "game_state") {
            this.gameStateEvent$.next(messageEvent);
          } else if (messageEvent.type === "badge-award") {
            this.badgeEvent$.next(messageEvent.data);
          } else if (messageEvent.type === "answer-summary") {
            this.answerSummary$.next(messageEvent);
          } else {
            console.error("Unrecognized Message Type: ", messageEvent.type);
          }
        }
      );

      this.eventSource.onopen = (
        (openEvent) => {
          console.log("SSE Open: " + JSON.stringify(openEvent))
        }
      );

      this.eventSource.onerror = (
        (error) => {
          console.log("SSE Error: " + JSON.stringify(error))
        }
      );

    }

  }

  /**
   * Observable that streams the answer-summary events.
   */
  public getAnswerSummaryObservable(): Observable<AnswerSummary> {
    return this.answerSummary$.map(
      event => {
        return JSON.parse(event.data).answerSummary;
      }
    );
  }

  public getBadgeEventObservable(): Observable<BadgeEvent> {
    return this.badgeEvent$.map(
      eventData => {
        return JSON.parse(eventData);
      }
    ).filter(
      /* Check that this badge award is for this session's user. */
      badgeEvent => (badgeEvent.userId === this.profileService.member.badgeOSId)
    );
  }

  /**
   * Observable that streams Game State events.
   */
  public getGameStateEventObservable(): Observable<any> {
    return this.gameStateEvent$.map(
      event => JSON.parse(event.data)
    );
  }

}
