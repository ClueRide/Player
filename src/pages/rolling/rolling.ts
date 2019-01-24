import {Component} from "@angular/core";
import {GameState} from "../../providers/game-state/game-state";
import {GameStateService} from "../../providers/game-state/game-state.service";
import {IonicPage} from "ionic-angular";
import {OutingService, OutingView} from "../../../../front-end-common/index";
import {Title} from "@angular/platform-browser";

/**
 * Presents the map for the game while "Rolling".
 *
 * This serves as the "root" of a game tree of pages, whose state changes are driven
 * by the subscription to the Game State (via the ServerEventsService).
 */

@IonicPage()
@Component({
  selector: 'page-rolling',
  templateUrl: 'rolling.html',
  providers: [
    OutingService,
  ],
})
export class RollingPage {
  outing: OutingView;
  gameState: GameState;

  constructor(
    private gameStateService: GameStateService,
    public outingService: OutingService,
    public titleService: Title,
  ) {
    console.log("Hello RollingPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollingPage');

    // TODO: CA-376 how to establish Outing?
    const outingId = 1;

    this.outingService.getSessionOuting().subscribe(
      (outing) => {
        this.outing = outing;
      }
    );

    this.gameStateService.getGameStateObservable().subscribe(
      (gameState) => {
        console.log("Rolling Page: Updating Game State");
        this.gameState = Object.assign({}, gameState);
      }
    );

  }

  ionViewDidEnter() {
    console.log("RollingPage.ionViewDidEnter");
    this.titleService.setTitle("Rolling");
  }

}
