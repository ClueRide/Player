import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {PageRoutingService} from "../../providers/page-routing/page-routing.service";
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
    private pageRouteService: PageRoutingService,
    public gameStateService: GameStateService,
  ) {
  }

  public showGame() {
    console.log('Showing Game Map');
    this.pageRouteService.showGame();
  }

}
