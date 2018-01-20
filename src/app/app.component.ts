import Auth0Cordova from "@auth0/cordova";
import {AuthService, RegistrationPage} from "front-end-common";
import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";
import {ProfileService} from "../../../front-end-common/src/providers/profile/profile.service";

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
    public profileService: ProfileService,
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /* Handles the return to the app after logging in at external site. */
      (<any>window).handleOpenURL = (url) => {
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
    /* This is dependent on the loadToken having been run (promise resolved) as the initialization of the app. */
    this.nav.setRoot(HomePage);
    if (this.authService.isAuthenticated()) {
      console.log("1. App is Registered under " + this.profileService.getPrincipal());
    } else {
      console.log("1. App is Unregistered");
      this.nav.push(RegistrationPage);
    }
  }

}
