import {Injectable} from "@angular/core";
import {App, NavController} from "ionic-angular";
import {GameState} from "./game-state";
import {Observable, Subject} from "rxjs";

/** Drives updating the Team Members synchronously between
 * Sleuthing (upon Arrival) and Rolling (upon Departure).
 */
@Injectable()
export class GameStateService {
  private gameStateSubject: Subject<GameState> = new Subject();
  private gameStateObservable: Observable<GameState> = this.gameStateSubject.asObservable();

  constructor(
    public app: App
  ) {
    console.log('Hello GameStateService Provider');
  }

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

  getGameStateObservable() {
    return this.gameStateObservable;
  }

}
