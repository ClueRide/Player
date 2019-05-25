import {Component} from "@angular/core";
import {ProfileService, PlatformStateService,} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {LoadStateService} from "../../providers/load-state/load-state.service";
import {Member} from "../../../../front-end-common/src/providers/profile/member";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  member: Member;

  constructor(
    /* Used on the HTML page: */
    public platform: PlatformStateService,
    private loadStateService: LoadStateService,
    private profileService: ProfileService,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    this.profileService.loadMemberProfile()
      .subscribe(
        (member) => {
          this.member = member;
        }
      );
    this.loadStateService.loadOutingData();
  }


  ionViewDidEnter() {
    this.titleService.setTitle("Home");
  }
}
