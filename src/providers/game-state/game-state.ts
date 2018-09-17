import {Injectable} from "@angular/core";
import {App} from "ionic-angular";

/*
  Generated class for the GameStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GameStateProvider {

  constructor(
    public app: App   // TODO: Temporary solution just to see if pages can be changed based on events
  ) {
    console.log('Hello GameStateProvider Provider');
  }

  updateFromEvent(eventJson: string) {
    let event = JSON.parse(eventJson);

    switch (event.event) {
      case "Team Assembled":
      case "Arrival":
        /* Case where we send out a Puzzle to be solved. */
        this.app.getRootNav().push("PuzzlePage");   // TODO: getRootNav is deprecated
        break;

      case "Departure":
        /* Case where we update the map to show the next path and we begin riding again. */
        this.app.getRootNav().pop()
          .then(
            (value => {
              this.app.getRootNav().push("RollingPage");
            })
          );
        break;

      default:
        console.log("Unrecognized Event: " + event.event);
        break;
    }
  }

}
