import { Component } from '@angular/core';
import {AppVersion} from "@ionic-native/app-version";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlatformStateService} from "front-end-common";

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

  about: {
    version: string,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private readonly appVersion: AppVersion,
    public readonly platform: PlatformStateService,
  ) {
    this.about = {
      version: ''
    }
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
