import Auth0Cordova from '@auth0/cordova';
import {AuthService} from "../../../front-end-common/src/providers/auth/auth.service";
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {RegistrationPage} from "../../../front-end-common/index";

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
      { title: 'List', component: ListPage }
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
    //TODO: this is intentionally backwards until proper logic is in place
    // if (this.authService.isAuthenticated()) {
    if (!this.authService.isAuthenticated()) {
      // console.log("1. App is Registered as " + this.tokenService.getPrincipalName());
      console.log("1. App is Registered as [TBD]");
      this.rootPage = HomePage;
    } else {
      console.log("1. App is Unregistered");
      this.rootPage = RegistrationPage;
    }
  }

}
