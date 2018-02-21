import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from 'front-end-common';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TeamPage} from "../pages/team/team";
import {OutingPage} from "../pages/outing/outing";
import {BadgesPage} from "../pages/badges/badges";
import {SummaryComponentsModule} from "../components/components.module";
import {OutingPageModule} from "../pages/outing/outing.module";
import {BadgesPageModule} from "../pages/badges/badges.module";
import {TeamPageModule} from "../pages/team/team.module";
import {RollingPage} from "../pages/rolling/rolling";
import {RollingPageModule} from "../pages/rolling/rolling.module";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BadgesPageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule.forRoot(),
    RollingPageModule,
    OutingPageModule,
    SummaryComponentsModule,
    TeamPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BadgesPage,
    HomePage,
    OutingPage,
    RollingPage,
    TeamPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
