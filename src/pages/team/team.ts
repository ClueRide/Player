import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GuideEventService} from "../../providers/resources/guide-events/guide-event.service";
import {GuideEventServiceProvider} from "../../providers/resources/guide-events/guide-event.service.provider";

/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
  providers: [
    GuideEventService,
    GuideEventServiceProvider
  ],
})
export class TeamPage {

  constructor(
    private guideEventService: GuideEventService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
  }

  // TODO: PLAY-31 Make this a proper assessment of the Guide's ability
  public isGuide(): boolean {
    return true;
  }

  signalTeamAssembled() {
    this.guideEventService.teamAssembled({});
  }

}
