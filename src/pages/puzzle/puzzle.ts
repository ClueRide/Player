import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GuideEventServiceProvider} from "../../providers/resources/guide-events/guide-event.service.provider";
import {GuideEventService} from "../../providers/resources/guide-events/guide-event.service";

/**
 * Generated class for the PuzzlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-puzzle',
  templateUrl: 'puzzle.html',
  providers: [
    GuideEventService,
    GuideEventServiceProvider
  ],
})
export class PuzzlePage {

  constructor(
    private guideEventService: GuideEventService,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PuzzlePage');
  }

  // TODO: PLAY-31 Make this a proper assessment of the Guide's ability
  public isGuide(): boolean {
    return true;
  }

  signalPuzzleSolved() {
    this.guideEventService.departure({});
  }

}
