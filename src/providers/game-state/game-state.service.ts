import {App, NavController} from "ionic-angular";
import {GameState} from "./game-state";
import {BASE_URL, HttpService} from "front-end-common";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "../../../../front-end-common/node_modules/rxjs";
import {RollingPage} from "../../pages/rolling/rolling";
import {PuzzlePage} from "../../pages/puzzle/puzzle-page";
import {ServerEventsService} from "../server-events/server-events.service";

/**
 * Drives updating the Team Members synchronously between
 * Sleuthing (upon Arrival) and Rolling (upon Departure).
 */
@Injectable()
export class GameStateService {
  private gameStateSubject: BehaviorSubject<GameState> = new BehaviorSubject(undefined);
  private gameStateObservable: Observable<GameState> = this.gameStateSubject.asObservable();

  private sseSubscription: Subscription;

  constructor(
    public app: App,
    private http: HttpClient,
    private httpService: HttpService,
    private sseService: ServerEventsService,
  ) {
    console.log('Hello GameStateService Provider');
    this.setupSseEventSubscription();
  }

  setupSseEventSubscription() {
    console.log("Listening to SSE Events for Game State");
    this.sseSubscription = this.sseService.getGameStateObservable()
      .subscribe(
        (event) => this.updateFromSSE(event)
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log("Unsubscribing to SSE Events for Game State");
    this.sseSubscription.unsubscribe();
  }

  /**
   * This responds to Server Sent Events (SSE) and echos them
   * as GameState instances published on the `gameStateObservable()`.
   */
  updateFromSSE(gameStateEvent: any) {
    let gameState: GameState = gameStateEvent.gameState;
    let eventType: string = gameStateEvent.event;
    let nav = <NavController>this.app.getRootNavById('n4');

    switch (eventType) {
      case "Team Assembled":
      case "Arrival":
        console.log("Arrival Event: Puzzle time");
        /* Case where we send out a Puzzle to be solved. */
        nav.setRoot(
          PuzzlePage,
          {id: gameState.puzzleId}
        );
        break;

      case "Departure":
        console.log("Depart Event: Rolling");
        /* Case where we update the map to show the next path and we begin riding again. */
        nav.setRoot(
          RollingPage,
          {gameState: gameState}
        ).then(
          () => {
            console.log("After Page Navigation completes: GameState is "
              + JSON.stringify(gameState));
          }
        );
        break;

      default:
        console.log("Unrecognized Event: " + eventType);
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

  public beginGame(): void {
    let nav = <NavController>this.app.getRootNavById('n4');
    this.requestGameState()
      .take(1)
      .subscribe(
        (gameState) => {
          if (gameState.pathIndex < 0
            || !gameState.teamAssembled
            || gameState.rolling
          ) {
            nav.setRoot(
              RollingPage,
              {gameState: gameState}
            );
          } else {
            nav.setRoot(
              PuzzlePage,
              {id: gameState.puzzleId}
            );
          }
        }
      );
  }

}
