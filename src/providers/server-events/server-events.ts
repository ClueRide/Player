import { Injectable } from '@angular/core';
import {EventSourcePolyfill} from "ng-event-source";
import {TokenService} from "../../../../front-end-common/index";

const gameStateUrl: string = 'http://sse.clueride.com/game-state-broadcast';

/**
 * Handles subscription to Server-Sent events (SSE) such as Game State transitions.
*/
@Injectable()
export class ServerEventsProvider {

  private eventSource: EventSourcePolyfill;

  constructor(
    private tokenService: TokenService
  ) {
  }

  /**
   * Begins listening for Game State events on the channel for the given Outing ID.
   * @param outingId
   */
  public initializeSubscriptions(outingId: number) {
    if (!this.eventSource) {
      let bearerToken = this.tokenService.getBearerToken();

      console.log("Opening Event Source");
      this.eventSource = new EventSourcePolyfill(gameStateUrl + "/" + outingId, {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      });

      this.eventSource.onmessage = (
        (messageEvent) => {
          console.log("SSE Message: " + messageEvent.data)
        }
      );

      this.eventSource.onopen = (
        (openEvent) => {
          console.log("SSE Open: " + openEvent)
        }
      )

      this.eventSource.onerror = (
        (error) => {
          console.log("SSE Error: " + error)
        }
      )
    }
  }

}
