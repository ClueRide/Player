import {Component} from '@angular/core';
import {ModalController} from "ionic-angular";
import {ServerEventsService} from "../../providers/server-events/server-events.service";
import {BadgeEvent} from "../badge-event/badge-event";
import {NewBadgePage} from "../../pages/new-badge/new-badge";
import {LoadStateService} from "../../providers/load-state/load-state.service";

/**
 * Component that listens for the ready flag to know when it can start monitoring
 * for Badge Events; once the event occurs, this is responsible for opening (and closing)
 * the modal that presents the new Badge.
 */
@Component({
  selector: 'popup-monitor',
  templateUrl: 'popup-monitor.html'
})
export class PopupMonitorComponent {

  text: string;

  constructor(
    private modalCtrl: ModalController,
    private sseService: ServerEventsService,
    private loadStateService: LoadStateService,
  ) {
    console.log('Hello PopupMonitorComponent Component');
    this.text = 'Hello World';
    this.loadStateService.getLoadStateObservable().subscribe(
      (readyFlag) => {
        if (readyFlag) {
          this.beginMonitoring();
        }
      }
    );
  }

  public beginMonitoring() {
    console.log('Popup Monitor - begin monitoring');
    this.sseService.getBadgeEventObservable().subscribe(
      (badge: BadgeEvent) => {
        console.info("Modal received a badge event with ID", badge.badgeFeatures.id, "for user", badge.userId);
        this.presentNewBadge(badge);
      }
    );
  }

  /**
   * Given a BadgeEvent, present it within a modal dialog.
   * @param badge: BadgeEvent of the awarded badge.
   */
  private presentNewBadge(badge: BadgeEvent) {
    let myModal = this.modalCtrl.create(
      NewBadgePage,
      badge
    );
    myModal.present();
  }

}
