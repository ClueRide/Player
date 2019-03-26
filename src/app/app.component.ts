import {AppState} from "../providers/app-state/app-state";
import {AppStateService} from "../providers/app-state/app-state.service";
import Auth0Cordova from "@auth0/cordova";
import {AuthService, AuthState, PlatformStateService} from "front-end-common";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";

import {BadgesPage} from "../pages/badges/badges";
import {HomePage} from "../pages/home/home";
import {OutingPage} from "../pages/outing/outing";
import {RollingPage} from "../pages/rolling/rolling";
import {TeamPage} from "../pages/team/team-page";

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
    public authService: AuthService,
    public appStateService: AppStateService,
    public platformService: PlatformStateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (!this.platformService.runningLocal()) {
        /* Since this is a cordova native statusbar, only set style if not within a browser (local). */
        this.statusBar.styleDefault();
      }

      /* Handles the return to the app after logging in at external site. */
      (<any>window).handleOpenURL = (url) => {
        console.log("Redirecting custom scheme: " + url);
        Auth0Cordova.onRedirectUri(url);
      }
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Outing', component: OutingPage },
      { title: 'Badges', component: BadgesPage },
      { title: 'Team', component: TeamPage },
      { title: 'Play Game', component: RollingPage },
    ];

  }

  /**
   * Menu calls into this to switch to a new page.
   * @param page the menu element the user chose.
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    console.log("App is initialized");
    /* URL Scheme determines the URL where we respond to callbacks from Identity Provider. */
    this.authService.setUrlScheme("com.clueride.player");

    let pageReadyPromise: Promise<void>;

    this.authService.getRegistrationState()
      .take(1)
      .subscribe(
        (authState: AuthState) => {
          switch (authState) {
            case AuthState.UNREGISTERED:
              pageReadyPromise = this.appStateService.prepareAndShowPage(AppState.UNREGISTERED);
              break;
            case AuthState.REGISTERED:
              console.log("ngOnInit(): we're registered");
              pageReadyPromise = this.appStateService.checkInviteIsAccepted();
              break;
            default:
              console.log("Unexpected Registration State: " + AuthState[authState]);
              break;
          }

          pageReadyPromise.then(
            () => {
              console.log("We think we have a promise fulfilled");
              if (!this.platformService.runningLocal()) {
                /* Splash screen is native only. */
                this.splashScreen.hide();
              }
            }
          );

        }
      );

  }

}
