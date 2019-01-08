import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OutingService} from "front-end-common";
import {OutingView} from "front-end-common";
import {Title} from "@angular/platform-browser";

/**
 * Orients players having accepted an invite by presenting an overview of the Outing.
 */

@IonicPage()
@Component({
  selector: 'page-outing',
  templateUrl: 'outing.html',
})
export class OutingPage {

  outing: OutingView = new OutingView();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
    public outingService: OutingService,
  ) {
    outingService.getSessionOuting().subscribe(
      /* Generally, the Outing has been cached. */
      (response) => {
        this.outing = response;
      }
    );
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Outing");
  }

  public addToCalendar() {
    window.console.log("TODO: Download .ics file")
  }

  public showTeam() {
    this.navCtrl.push("TeamPage");
  }

}
