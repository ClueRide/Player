import { Component } from '@angular/core';
import {NavController} from "ionic-angular";

/**
 * Generated class for the OutingSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'outing-summary',
  templateUrl: 'outing-summary.html'
})
export class OutingSummaryComponent {

  outing = {
    course: {
      url: "five-free-things",
      name: "Five Free Things"
    },
    date: "Saturday, March 3, 2018",
    time: "10AM - 1PM"
  };

  constructor(
    public navCtrl: NavController
  ) {
  }

  public viewDetails() {
    this.navCtrl.push("OutingPage");
  }

}
