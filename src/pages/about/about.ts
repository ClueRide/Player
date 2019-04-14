import {Component} from '@angular/core';
import {AppVersion} from "@ionic-native/app-version";
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PlatformStateService, ProfileService} from "front-end-common";

/**
 * Presents version information when running natively, and links
 * to the main website in all cases.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  /* Public members. */
  readonly about: {version: string} = {version: ''};
  /* Values here are replaced at build time by cordova's `before_prepare` script. */
  readonly buildDate: string = 'BUILD_DATE';
  readonly gitSha: string = 'GIT_VERSION_STRING';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private readonly appVersion: AppVersion,
    public readonly platform: PlatformStateService,
    public readonly memberService: ProfileService,
  ) {
  }

  ngOnInit(): void {
    /* Retrieve the Version information if we have Cordova available. */
    if (!this.platform.runningLocal()) {
      this.appVersion.getVersionNumber()
        .then(
          (version) => {
            console.log("Able to retrieve Version info.");
            this.about.version = version;
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
