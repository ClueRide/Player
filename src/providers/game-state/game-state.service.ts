import {Injectable} from "@angular/core";
import {App, NavController} from "ionic-angular";

/** Drives updating the Team Members synchronously between
 * Sleuthing (upon Arrival) and Rolling (upon Departure).
 */
@Injectable()
export class GameStateService {

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
        (<NavController>this.app.getRootNavById('n4')).push("PuzzlePage");
        break;

      case "Departure":
        /* Case where we update the map to show the next path and we begin riding again. */
        (<NavController>this.app.getRootNavById('n4')).popToRoot();
        // Do I need to respond to the promise?
        break;

      default:
        console.log("Unrecognized Event: " + event.event);
        break;
    }
  }

}
