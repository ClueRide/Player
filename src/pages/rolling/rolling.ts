import {Component, ViewChild} from "@angular/core";
import {GameState} from "../../providers/game-state/game-state";
import {GameStateService} from "../../providers/game-state/game-state.service";
import {IonicPage, Navbar} from "ionic-angular";
import {OutingService, OutingView} from "../../../../front-end-common/index";
import {Title} from "@angular/platform-browser";
import {NavService} from "../../providers/nav/nav.service";

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
  @ViewChild(Navbar) navbar: Navbar;

  constructor(
    private gameStateService: GameStateService,
    public outingService: OutingService,
    public titleService: Title,
    public navService: NavService,
  ) {
    console.log("Hello RollingPage");
  }

  ionViewWillEnter() {
    this.navbar.backButtonClick =
      (e:UIEvent) => {
      console.log("Responding to Back Button");
        this.navService.goToPage("HomePage");
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollingPage');

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
