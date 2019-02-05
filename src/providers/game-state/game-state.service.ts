import {App, NavController} from "ionic-angular";
import {GameState} from "./game-state";
import {BASE_URL, HttpService} from "front-end-common";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "../../../../front-end-common/node_modules/rxjs";

/** Drives updating the Team Members synchronously between
 * Sleuthing (upon Arrival) and Rolling (upon Departure).
 */
@Injectable()
export class GameStateService {
  private gameStateSubject: Subject<GameState> = new Subject();
  private gameStateObservable: Observable<GameState> = this.gameStateSubject.asObservable();

  constructor(
    public app: App,
    private http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello GameStateService Provider');
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
          "RollingPage",
          {
            gameState: event.gameState
          }
        ).then(
          () => {
            console.log("After Page Navigation completes: GameState is " + JSON.stringify(event.gameState));
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
        headers: this.httpService.getAuthHeaders()
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

  public beginGame(): void {
    this.requestGameState().subscribe(
      (gameState) => {
        if (gameState.pathIndex < 0
          || !gameState.teamAssembled
          || gameState.rolling
        ) {
          /* Show the Rolling Page */
          (
            <NavController>this.app.getRootNavById('n4')
          ).setRoot(
            "RollingPage",
            {
              gameState: gameState
            }
          );
        } else {
          /* Show the Puzzle */
          (<NavController>this.app.getRootNavById('n4')).setRoot("PuzzlePage");
        }
      }
    );
  }

}
