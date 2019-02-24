import {Component} from "@angular/core";
import {AuthService, ProfileService, PlatformStateService,} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {LoadStateService} from "../../providers/load-state/load-state.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    /* Used on the HTML page: */
    public auth: AuthService,
    public platform: PlatformStateService,
    private loadStateService: LoadStateService,
    private profileService: ProfileService,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    this.profileService.loadMemberProfile();
    this.loadStateService.loadOutingData();
  }


  ionViewDidEnter() {
    this.titleService.setTitle("Home");
  }
}
