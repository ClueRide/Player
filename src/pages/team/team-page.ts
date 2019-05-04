import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {Title} from "@angular/platform-browser";
import {Team, TeamService} from "front-end-common";
import {GuideEventService} from "../../providers/guide-event-service/guide-event-service";

/**
 * Presents members of a Team.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
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

  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  signalTeamAssembled() {
    this.guideEventService.sendTeamAssembled();
  }

}
