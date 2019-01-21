import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {OutingService} from "../../../../front-end-common/index";
import {OutingView} from "../../../../front-end-common/index";
import {ServerEventsService} from "../../providers/server-events/server-events.service";
import {Title} from "@angular/platform-browser";

/**
 * Presents the map for the game while "Rolling".
 *
 * This serves as the "root" of a game tree of pages, whose state changes are driven
 * by the subscription to the Game State (via the ServerEventsService).
 *
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

  constructor(
    private serverEvents: ServerEventsService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public outingService: OutingService,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollingPage');

    // TODO: CA-376 how to establish Outing?
    const outingId = 1;

    this.serverEvents.initializeSubscriptions(outingId);

    this.outingService.get(
      outingId
    ).subscribe(
      (outing) => {
        this.outing = outing;
      }
    );

  }

  ionViewDidEnter() {
    this.titleService.setTitle("Rolling");
  }

}
