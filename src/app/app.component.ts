import Auth0Cordova from "@auth0/cordova";
import {AuthService, RegistrationPage} from "front-end-common";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {Subject} from "rxjs/Subject";

import {HomePage} from "../pages/home/home";
import {InvitePage} from "../pages/invite/invite";
import {OutingPage} from "../pages/outing/outing";
import {TeamPage} from "../pages/team/team";
import {BadgesPage} from "../pages/badges/badges";
import {RollingPage} from "../pages/rolling/rolling";

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
      this.statusBar.styleDefault();

      /* Handles the return to the app after logging in at external site. */
      (<any>window).handleOpenURL = (url) => {
        console.log("Redirecting custom scheme: " + url);
        Auth0Cordova.onRedirectUri(url);
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    console.log("App is initialized");
    this.authService.setUrlScheme("com.clueride.player");
    this.checkDeviceRegistered().subscribe(
      (result) => {
        /* We're registered. */
        console.log("Successfully registered.");
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

        pageReadyPromise = this.nav.setRoot(HomePage);
        if (needsRegistration) {
          pageReadyPromise = this.nav.push(RegistrationPage);
        } else {
          pageReadyPromise = this.nav.push(InvitePage);
        }

        pageReadyPromise.then(
          () => {
            this.splashScreen.hide();
            registeredStateSubject.next(1);
          }
        );
      }
    );

    return registeredStateSubject.asObservable();
  }

}
