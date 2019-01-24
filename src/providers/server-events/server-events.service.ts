import {Injectable} from '@angular/core';
import {EventSourcePolyfill} from "ng-event-source";
import {GameStateService} from "../game-state/game-state.service";
import {TokenService} from "../../../../front-end-common/index";

const gameStateUrl: string = 'http://sse.clueride.com/game-state-broadcast';

/**
 * Handles subscription to Server-Sent events (SSE) such as Game State transitions.
*/
@Injectable()
export class ServerEventsService {

  private eventSource: EventSourcePolyfill;

  constructor(
    private tokenService: TokenService,
    private gameStateService: GameStateService
  ) {
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

      this.eventSource.onmessage = (
        (messageEvent) => {
          console.log("SSE Message: " + JSON.stringify(messageEvent.data));
          this.gameStateService.updateFromEvent(messageEvent.data);
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

}
