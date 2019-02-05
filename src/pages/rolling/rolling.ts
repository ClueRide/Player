import {Component} from "@angular/core";
import {GameState} from "../../providers/game-state/game-state";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {OutingService, OutingView} from "front-end-common";
import {Title} from "@angular/platform-browser";

/**
 * Presents the map for the game while "Rolling".
 */

@IonicPage()
@Component({
  selector: 'page-rolling',
  templateUrl: 'rolling.html',
})
export class RollingPage {
  outing: OutingView;
  gameState: GameState;

  constructor(
    public outingService: OutingService,
    public titleService: Title,
    public navCtrl: NavController,  /* Template passes this to sub-components */
    public navParams: NavParams,
  ) {
    console.log("Hello RollingPage");
    this.gameState = navParams.get('gameState');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollingPage');

    this.outingService.getSessionOuting().subscribe(
      (outing) => {
        this.outing = outing;
      }
    );

  }

  ionViewDidEnter() {
    console.log("RollingPage.ionViewDidEnter");
    this.titleService.setTitle("Rolling");
  }

}
