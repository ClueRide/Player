import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BASE_URL, HttpService} from "front-end-common";
import {BehaviorSubject, Observable, Subject, Subscription} from "../../../../front-end-common/node_modules/rxjs";
import {ServerEventsService} from "../server-events/server-events.service";
import {GameState} from "./game-state";

/**
 * Drives updating the Team Members synchronously between
 * Sleuthing (upon Arrival) and Rolling (upon Departure).
 *
 * Events are presented on one of two channels Puzzle or Rolling.
 */
@Injectable()
export class GameStateService {
  private gameStateSubject: BehaviorSubject<GameState> = new BehaviorSubject(undefined);
  private gameStateObservable: Observable<GameState> = this.gameStateSubject.asObservable();
  private puzzleEvent$: Subject<GameState>;
  private rollingEvent$: Subject<GameState>;

  private sseSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
    private sseService: ServerEventsService,
  ) {
    console.log('Hello GameStateService Provider');
    this.puzzleEvent$ = new Subject<GameState>();
    this.rollingEvent$ = new Subject<GameState>();
    this.setupSseEventSubscription();
  }

  setupSseEventSubscription() {
    console.log("Listening to SSE Events for Game State");
    this.sseSubscription = this.sseService.getGameStateEventObservable()
      .subscribe(
        (event) => this.updateFromSSE(event)
      );
  }

  ngOnInit() {
  }

  /**
   * This responds to Server Sent Events (SSE) and echos them
   * as GameState instances published on the `gameStateObservable()`.
   */
  updateFromSSE(gameStateEvent: any) {
    const gameState: GameState = gameStateEvent.gameState;
    const eventType = gameStateEvent.event;

    /* Feed one of the two channels based on the event type. */
    switch(eventType) {
      case "Team Assembled":
      case "Arrival":
        this.puzzleEvent$.next(gameState);
        break;
      case "Departure":
        this.rollingEvent$.next(gameState);
        break;
      default:
        console.log("Unrecognized Event: " + eventType);
        break;
    }

    /* Generic notification of new Game State. */
    this.gameStateSubject.next(gameState);
  }

  puzzleEvents(): Observable<GameState> {
    return this.puzzleEvent$;
  }

  rollingEvents(): Observable<GameState> {
    return this.rollingEvent$;
  }

  /**
   * This allows requesting the Game State instead of waiting for a
   * Server Sent Event (SSE) to occur.
   *
   * Uses the same observable to pass along Game State changes.
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

  ngOnDestroy() {
    console.log("Unsubscribing to SSE Events for Game State");
    this.sseSubscription.unsubscribe();
  }

}
