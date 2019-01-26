import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar} from 'ionic-angular';
import {OutingService, OutingView} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {NavService} from "../../providers/nav/nav.service";

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
  @ViewChild(Navbar) navbar: Navbar;

  constructor(
    public navService: NavService,
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

  ionViewWillEnter() {
    this.navbar.backButtonClick =
      (e:UIEvent) => {
      console.log("Responding to Back Button");
        this.navService.goToPage("HomePage");
      }
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Outing");
  }

  public addToCalendar() {
    window.console.log("TODO: Download .ics file")
  }

  public showTeam() {
    this.navService.goToPage("TeamPage");
  }

}
