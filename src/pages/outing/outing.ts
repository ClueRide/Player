import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {OutingService, OutingView} from "front-end-common";
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
    public titleService: Title,
    public outingService: OutingService,
  ) {
    outingService.getSessionOuting().subscribe(
      /* Generally, the Outing has been cached. */
      (response) => {
        console.log("Receiving Outing from Service");
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
