import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Outing} from "../../providers/resources/outing/outing";

/**
 * Generated class for the OutingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outing',
  templateUrl: 'outing.html',
})
export class OutingPage {

  outing:Outing = {
    id: 12,
    // CA-354
    // course: {
    //   url: "five-free-things",
    //   name: "Five Free Things",
    //   startPin: {
    //     id: 1234,
    //     lat: 33.7876935,
    //     lon: -84.3727149,
    //     lng: -84.3727149
    //   }
    // },
    guideMemberId: 7,
    // date: "Saturday, March 3, 2018",
    // time: "10AM - 1PM",
    // team: {
    //   id: 6,
    //   name: "Soul Purpose"
    // },
    courseId: 3,
    scheduledTime: 0,
    teamId: 42
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  public addToCalendar() {
    window.console.log("TODO: Download .ics file")
  }

  public showTeam() {
    this.navCtrl.push("TeamPage");
  }
}
