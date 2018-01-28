import { Component } from '@angular/core';
import {Badge, BadgeService} from "front-end-common";
import {NavController} from "ionic-angular";

/**
 * Generated class for the BadgeSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'badge-summary',
  templateUrl: 'badge-summary.html'
})
export class BadgeSummaryComponent {
  badges: Array<Badge>;
  badgeService: BadgeService;

  constructor(
    badgeService: BadgeService,
    public navCtrl: NavController
  ) {
    this.badgeService = badgeService;
  }

  ngOnInit() {
    this.badgeService.getList().subscribe(
      (response) => {
        this.badges = response;
      }
    );
  }

  public viewDetails() {
    this.navCtrl.push("BadgesPage");
  }

}
