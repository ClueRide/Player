import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {GameStateService} from "../../providers/game-state/game-state.service";

/**
 * Generated class for the BeginGameComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'begin-game',
  templateUrl: 'begin-game.html'
})
export class BeginGameComponent {

  constructor(
    public navCtrl: NavController,
    private gameStateService: GameStateService,
  ) {
  }

  public beginGame() {
    console.log('Beginning Game');
    this.gameStateService.beginGame();
  }

}
