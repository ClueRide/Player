import {AppStateService} from "../providers/app-state/app-state.service";
import {
  ConfirmPage,
  PlatformStateService,
  RegistrationPage,
  RegStateKey,
  RegStateService,
} from "front-end-common";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";

import {AboutPage} from "../pages/about/about";
import {BadgesPage} from "../pages/badges/badges";
import {HomePage} from "../pages/home/home";
import {OutingPage} from "../pages/outing/outing";
import {PrivacyPage} from "../pages/privacy/privacy";
import {RollingPage} from "../pages/rolling/rolling";
import {TeamPage} from "../pages/team/team-page";
import {filter, find} from "rxjs/operators";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public appStateService: AppStateService,
    public platformStateService: PlatformStateService,
    private regStateService: RegStateService,
  ) {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log("Platform ready");

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platformStateService.isNativeMode()) {
        /* Since this is a cordova native statusbar, only set style if not within a browser (local). */
        this.statusBar.styleDefault();
      }

      this.setupRegStateResponse();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Outing', component: OutingPage },
      { title: 'Badges', component: BadgesPage },
      { title: 'Team', component: TeamPage },
      { title: 'Play Game', component: RollingPage },
      { title: 'Privacy', component: PrivacyPage },
      { title: 'About', component: AboutPage },
    ];

  }

  /**
   * Triggers the check of a Registration State to make sure our Access Token is ready.
   *
   * If registration/confirmation are required, we provide the pages from within our navigation scheme;
   * those pages will feed back into changes of the Registration State that we pick up via the stream.
   */
  private setupRegStateResponse(): void {

    const regStateObservable = this.regStateService.requestRegState(
      "com.clueride.player"
    );

    /* Handle Registration -- generally, a one-time occurrence, but there are re-tries. */
    regStateObservable.pipe(
      filter(regState => regState.state === RegStateKey.REGISTRATION_REQUIRED)
    ).subscribe(() => {
      console.log("We need to show the Registration Page");
      this.nav.setRoot(RegistrationPage)
        .then()
        .catch(error => console.error("Did not get Registration Page", error));
    });

    /* Handle Profile Confirmation -- generally, a one-time occurrence, but there are re-tries. */
    regStateObservable.pipe(
      filter(regState => regState.state === RegStateKey.CONFIRMATION_REQUIRED)
    ).subscribe(() => {
        console.log("We need to show the Confirmation Page");
        this.nav.setRoot(ConfirmPage)
          .then()
          .catch(error => console.error("Did not get Registration Page", error));
      }
    );

    /* Handle Active Session -- typical case. */
    regStateObservable.pipe(
      find(regState => regState.state === RegStateKey.ACTIVE)
    ).subscribe(regState => {
        console.log("Active by the grace of", regState.source );
        /* Proceed with the application. */
        this.appStateService.checkInviteIsAccepted()
          .then()
          .catch();
      }
    );

  }

  /**
   * Menu calls into this to switch to a new page.
   * @param page the menu element the user chose.
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // TODO: PLAY-58 - Rolling Page accepts path param
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    this.initializeApp();
    console.log("App is initialized");
  }

}
