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
  private isGuideFlag: boolean = false;

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
        this.badges.forEach(
          badge => {
            /* TODO: PLAY-31 Also need to match up the courses trained for. */
            if (badge.badgeType === "GUIDE") {
              this.isGuideFlag = true;
            }
          }
        );
      }
    );
  }

  public viewDetails() {
    this.navCtrl.push("BadgesPage");
  }

  public isGuide() {
    return this.isGuideFlag;
  }

}
