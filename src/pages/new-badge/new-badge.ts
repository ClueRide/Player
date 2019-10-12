import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import {BadgeFeatures} from "front-end-common";

/**
 * This is the page displayed when a New Badge is awarded.
 *
 * It is intended to be contained within a Modal Dialog.
 */
@IonicPage()
@Component({
  selector: 'page-new-badge',
  templateUrl: 'new-badge.html',
})
export class NewBadgePage {

  readonly badge: BadgeFeatures;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.badge = navParams.get("badgeFeatures");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBadgePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
