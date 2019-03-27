import {AnswerSummary} from "../answer-summary/answer-summary";
import {EventSourcePolyfill, OnMessageEvent} from "ng-event-source";
import {fromEvent} from "rxjs/observable/fromEvent";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {TokenService} from "front-end-common";
import {tap} from "rxjs/operators/tap";

const gameStateUrl: string = 'http://sse.clueride.com/game-state-broadcast';

/**
 * Handles subscription to Server-Sent events (SSE) such as Game State transitions.
*/
@Injectable()
export class ServerEventsService {

  private eventSource: EventSourcePolyfill;
  private answerSummary$: Observable<OnMessageEvent>;
  private gameState$: Subject<OnMessageEvent>;

  constructor(
    private tokenService: TokenService,
  ) {
    this.gameState$ = new Subject<OnMessageEvent>();
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

      /* Standard event definitions. */
      this.eventSource.onmessage = (
        (messageEvent: OnMessageEvent) => {
          console.log("SSE Message: " + JSON.stringify(messageEvent.data));
          this.gameState$.next(messageEvent);
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

      // TODO: I haven't yet gotten this to work; currently passing the message from `.onMessage`.
      /* Custom event definitions. */
      fromEvent(
        this.eventSource,
        'game-state'
      ).pipe(tap(() => console.log("Got Game State Event")))
        .subscribe(this.gameState$.next);

      this.answerSummary$ = fromEvent(
        this.eventSource,
        'answer-summary'
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

  /**
   * Observable that streams Game State events.
   */
  public getGameStateObservable(): Observable<any> {
    return this.gameState$.map(
      event => JSON.parse(event.data)
    );
  }

}
