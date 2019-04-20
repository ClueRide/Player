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
  private outingSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private outingService: OutingService,
  ) {
    this.outing = <any>{};
  }

  ngAfterViewInit() {
    this.outingSubscription = this.outingService.getSessionOuting().subscribe(
      (response) => {
        this.outing = response;
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
