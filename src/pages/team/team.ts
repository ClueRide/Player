import {Component, ViewChild} from "@angular/core";
import {IonicPage, Navbar, NavController, NavParams} from "ionic-angular";
import {GuideEventService} from "../../providers/resources/guide-events/guide-event.service";
import {GuideEventServiceProvider} from "../../providers/resources/guide-events/guide-event.service.provider";
import {Title} from "@angular/platform-browser";
import {NavService} from "../../providers/nav/nav.service";

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

  @ViewChild(Navbar) navbar: Navbar;

  constructor(
    private guideEventService: GuideEventService,
    public navCtrl: NavController,
    public navService: NavService,
    public titleService: Title,
  ) {
  }

  ionViewWillEnter() {
    this.navbar.backButtonClick =
      (e:UIEvent) => {
        console.log("Responding to Back Button");
        this.navService.goToPage("HomePage");
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter TeamPage');
    this.titleService.setTitle("Team");
  }

  // TODO: PLAY-31 Make this a proper assessment of the Guide's ability
  public isGuide(): boolean {
    return true;
  }

  signalTeamAssembled() {
    this.guideEventService.teamAssembled({});
  }

}
