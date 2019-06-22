import {AfterViewInit, Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {OutingPage} from "../../pages/outing/outing";
import {OutingService, OutingView} from "front-end-common";
import {Subscription} from "rxjs/Subscription";

/**
 * Displays selected details from the Outing sufficient for the player to know
 * where to be and when the game starts.
 *
 * Also provides links to more information about the course and a button to bring
 * up the full Outing Page.
 */
@Component({
  selector: 'outing-summary',
  templateUrl: 'outing-summary.html'
})
export class OutingSummaryComponent
implements AfterViewInit {

  outing: OutingView;
  outingTense: "past" | "present" | "future";
  private outingSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private outingService: OutingService,
  ) {
    this.outing = <any>{};
    this.outingTense = "present";
  }

  ngAfterViewInit() {
    this.outingSubscription = this.outingService.getSessionOuting().subscribe(
      (response) => {
        this.outing = response;
        let today = new Date();
        let scheduledDate = new Date(this.outing.scheduledTime);
        if (scheduledDate.getDay() === today.getDay()) {
          this.outingTense = "present";
        } else if (scheduledDate > today) {
          this.outingTense = "future";
        } else if (scheduledDate < today) {
          this.outingTense = "past";
        }
      }
    );
  }

  public viewDetails() {
    this.navCtrl.push(OutingPage);
  }

  ngOnDestroy() {
    this.outingSubscription.unsubscribe();
  }

}
