import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {ServerEventsProvider} from "../../providers/server-events/server-events";
import {Outing} from "../../providers/resources/outing/outing";
import {OutingService} from "../../providers/resources/outing/outing.service";
import {OutingServiceProvider} from "../../providers/resources/outing/outing.service.provider";
import {Title} from "@angular/platform-browser";

/**
 * Generated class for the RollingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rolling',
  templateUrl: 'rolling.html',
  providers: [
    OutingService,
    OutingServiceProvider
  ],
})
export class RollingPage {
  outing: Outing;

  constructor(
    private serverEvents: ServerEventsProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public outingService: OutingService,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollingPage');

    // TODO: CA-376 how to establish Outing?
    const outingId = 3;

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
