import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {GuideEventService} from "../../providers/resources/guide-events/guide-event.service";
import {GuideEventServiceProvider} from "../../providers/resources/guide-events/guide-event.service.provider";
import {Title} from "@angular/platform-browser";
import {Team, TeamService} from "front-end-common";

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

  public team: Team = {
    id: 0,
    name: 'Team',
    members: []
  };

  constructor(
    private guideEventService: GuideEventService,
    private teamService: TeamService,
    public navCtrl: NavController,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamPage');
    this.team = this.teamService.getTeam();
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
