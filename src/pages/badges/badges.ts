import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Title} from "@angular/platform-browser";

/**
 * Generated class for the BadgesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-badges',
  templateUrl: 'badges.html',
})
export class BadgesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BadgesPage');
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Badges");
  }

}
