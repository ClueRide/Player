import {Component} from "@angular/core";
import {GameState} from "../../providers/game-state/game-state";
import {GameStateService} from "../../providers/game-state/game-state.service";
import {IonicPage} from "ionic-angular";
import {OutingService, OutingView} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";

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
})
export class RollingPage {
  outing: OutingView;
  gameState: GameState;
  gameStateSubscription: Subscription;

  constructor(
    private gameStateService: GameStateService,
    public outingService: OutingService,
    public titleService: Title,
  ) {
    console.log("Hello RollingPage");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollingPage');

    this.outingService.getSessionOuting().subscribe(
      (outing) => {
        this.outing = outing;
      }
    );

    this.gameStateSubscription = this.gameStateService.getGameStateObservable().subscribe(
      (gameState) => {
        console.log("Rolling Page: Updating Game State");
        this.gameState = gameState;
      }
    );

  }

  ionViewDidEnter() {
    console.log("RollingPage.ionViewDidEnter");
    this.titleService.setTitle("Rolling");
  }

  ngOnDestroy() {
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }
  }

}
