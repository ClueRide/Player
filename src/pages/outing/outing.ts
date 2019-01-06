import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LatLon} from "../../components/lat-lon";
import {Observable} from "rxjs/Observable";
import {OutingService} from "../../../../front-end-common/index";
import {OutingView} from "../../../../front-end-common/index";
import {Subject} from "rxjs/Subject";
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
  pinSubject: Subject<LatLon> = new Subject<LatLon>();
  pinObservable: Observable<LatLon> = this.pinSubject.asObservable();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
    public outingService: OutingService,
  ) {
    /* TODO: FEC-8
     * Consider that an outing only changes as the invitation is accepted and can be held within
     * the Outing Service.
     */
    // TODO: CA-376 pickup Outing from session as part of accepting the Invite.
    let outingId: number = 1;

    outingService.get(outingId).subscribe(
      (response) => {
        console.log("Got Outing View; sending Pin to subject");
        this.pinSubject.next(response.startPin);
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
