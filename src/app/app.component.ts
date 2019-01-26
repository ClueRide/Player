import {AppState} from "../providers/app-state/app-state";
import {AppStateService} from "../providers/app-state/app-state.service";
import Auth0Cordova from "@auth0/cordova";
import {AuthService} from "front-end-common";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {Subject} from "rxjs/Subject";

import {BadgesPage} from "../pages/badges/badges";
import {HomePage} from "../pages/home/home";
import {OutingPage} from "../pages/outing/outing";
import {RollingPage} from "../pages/rolling/rolling";
import {TeamPage} from "../pages/team/team";
import {NavService} from "../providers/nav/nav.service";

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
    public navService: NavService,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Outing', component: OutingPage },
      { title: 'Badges', component: BadgesPage },
      { title: 'Team', component: TeamPage },
      { title: 'Play Game', component: RollingPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (!this.authService.runningLocal()) {
        /* Since this is a cordova native statusbar, only set style if not within a browser (local). */
        this.statusBar.styleDefault();
      }

      /* Handles the return to the app after logging in at external site. */
      (<any>window).handleOpenURL = (url) => {
        console.log("Redirecting custom scheme: " + url);
        Auth0Cordova.onRedirectUri(url);
      };

      /* Handles the hardware back button; not the one in the NavBar. */
      this.platform.registerBackButtonAction(
        () => {
          console.log("Responding to Back Button");
          this.navService.goToPage("HomePage");
        }
      );

    });
  }

  /** This is used by the current Menu that is setup within the app.html template. */
  openPage(page) {
    this.navService.goToPage(page.component.name);
  }

  ngOnInit() {
    console.log("App is initialized");
    /* URL Scheme determines the URL where we respond to callbacks from Identity Provider. */
    this.authService.setUrlScheme("com.clueride.player");

    this.checkDeviceRegistered().subscribe(
      (result) => {
        /* Nothing to be done; we're now on the correct initial page. */
      },
      () => {
        /* Problem. */
        console.log("Problem registering the application.");
      }
    );
  }

  /** Bring up Registration page if not yet registered; otherwise, wait for fresh token. */
  private checkDeviceRegistered(): Observable<number> {
    let registeredStateSubject: Subject<number> = new Subject;

    this.authService.checkRegistrationRequired().then(
      (needsRegistration) => {
        let pageReadyPromise: Promise<void>;

        if (needsRegistration) {
          pageReadyPromise = this.appStateService.prepareAndShowPage(AppState.UNREGISTERED);
        } else {
          pageReadyPromise = this.appStateService.checkInviteIsAccepted();
        }

        pageReadyPromise.then(
          () => {
            if (!this.authService.runningLocal()) {
              /* Splash screen is native only. */
              this.splashScreen.hide();
            }
            registeredStateSubject.next(1);
          }
        );
      }
    );

    return registeredStateSubject.asObservable();
  }

}
