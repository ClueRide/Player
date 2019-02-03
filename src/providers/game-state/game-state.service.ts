import {Injectable} from "@angular/core";
import {App, NavController} from "ionic-angular";
import {GameState} from "./game-state";
import {Observable, Subject} from "rxjs";
import {BASE_URL, TokenService} from "front-end-common";
import {HttpClient, HttpHeaders} from "@angular/common/http";

/** Drives updating the Team Members synchronously between
 * Sleuthing (upon Arrival) and Rolling (upon Departure).
 */
@Injectable()
export class GameStateService {
  private gameStateSubject: Subject<GameState> = new Subject();
  private gameStateObservable: Observable<GameState> = this.gameStateSubject.asObservable();

  private httpOptions;

  constructor(
    public app: App,
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    console.log('Hello GameStateService Provider');
    this.httpOptions = new HttpHeaders({
      'Authorization': 'Bearer ' + this.tokenService.getBearerToken()
    });
  }

  /**
   * This responds to Server Sent Events (SSE) and echos them
   * as GameState instances published on the `gameStateObservable()`.
   */
  updateFromEvent(eventJson: string) {
    let event = JSON.parse(eventJson);

    switch (event.event) {
      case "Team Assembled":
      case "Arrival":
        /* Case where we send out a Puzzle to be solved. */
        (<NavController>this.app.getRootNavById('n4')).setRoot("PuzzlePage");
        break;

      case "Departure":
        /* Case where we update the map to show the next path and we begin riding again. */
        (
          <NavController>this.app.getRootNavById('n4')
        ).setRoot(
          "RollingPage"
        ).then(
          () => {
            console.log("After Page Navigation completes: GameState is " + JSON.stringify(event.gameState));
            this.gameStateSubject.next(event.gameState);
          }
        );
        break;

      default:
        console.log("Unrecognized Event: " + event.event);
        break;
    }

  }

  /**
   * This allows requesting the Game State instead of waiting for a
   * Server Sent Event (SSE) to occur.
   * Still uses the same observable to pass along Game State changes.
   */
  requestGameState(): Observable<GameState> {
    console.log("Explicit Request for Game State");
    this.http.get(
      BASE_URL + 'game-state',
      {
        headers: this.httpOptions
      }
    ).subscribe(
      (response) => {
        this.gameStateSubject.next(<GameState>response);
      }
    );
    return this.gameStateObservable;
  }

  getGameStateObservable(): Observable<GameState> {
    return this.gameStateObservable;
  }

}
