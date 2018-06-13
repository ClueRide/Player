import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServerEventsProvider} from "../../providers/server-events/server-events";

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
})
export class RollingPage {

  constructor(
    private serverEvents: ServerEventsProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RollingPage');
    this.serverEvents.initializeSubscriptions(3);
  }

}
