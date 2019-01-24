import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {ServerEventsService} from "../../providers/server-events/server-events.service";
import {OutingService} from "../../../../front-end-common/index";

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
    private outingService: OutingService,
    private serverEventsService: ServerEventsService,
  ) {
  }

  public beginGame() {
    console.log('Beginning Game');

    /* Request the session's outing and use the response to setup Game State subscriptions against the outing. */
    this.outingService.getSessionOuting(). subscribe(
      (outingView) => {
        this.serverEventsService.initializeSubscriptions(outingView.id);
      }
    );

    /* Kick us over to the Rolling Page's Map view. */
    this.navCtrl.setRoot("RollingPage");
  }

}
