import {Component} from '@angular/core';
import {Badge, BadgeService} from "front-end-common";
import {BadgesPage} from "../../pages/badges/badges";
import {NavController} from "ionic-angular";
import {BadgeProgressService, BadgeProgress} from "front-end-common";

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
  chips: Array<BadgeProgress>;

  constructor(
    private badgeService: BadgeService,
    public navCtrl: NavController,
    private badgeProgressService: BadgeProgressService,
  ) {
  }

  ngOnInit() {
    /* Consider caching these. */
    this.badgeService.getList().subscribe(
      (response) => {
        this.badges = response;
      }
    );

    this.badgeProgressService.getProgressChips().subscribe(
      (response) => {
        this.chips = response;
      }
    );
  }

  public viewDetails() {
    this.navCtrl.push(BadgesPage);
  }

}
