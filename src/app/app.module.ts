import {BrowserModule} from "@angular/platform-browser";
import {ComponentsModule} from "front-end-common";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";

import {MyApp} from "./app.component";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";

import {AppStateService} from '../providers/app-state/app-state.service';
import {BadgesPage} from "../pages/badges/badges";
import {BadgesPageModule} from "../pages/badges/badges.module";
import {GameStateService} from "../providers/game-state/game-state.service";
import {HomePage} from "../pages/home/home";
import {InvitePage} from "../pages/invite/invite";
import {InvitePageModule} from "../pages/invite/invite.module";
import {NavService} from '../providers/nav/nav.service';
import {OutingPage} from "../pages/outing/outing";
import {OutingPageModule} from "../pages/outing/outing.module";
import {RollingPage} from "../pages/rolling/rolling";
import {RollingPageModule} from "../pages/rolling/rolling.module";
import {ServerEventsService} from "../providers/server-events/server-events.service";
import {SummaryComponentsModule} from "../components/components.module";
import {TeamPage} from "../pages/team/team";
import {TeamPageModule} from "../pages/team/team.module";

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
    InvitePageModule,
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
    InvitePage,
    OutingPage,
    RollingPage,
    TeamPage,
  ],
  providers: [
    AppStateService,
    GameStateService,
    NavService,
    ServerEventsService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})

export class AppModule {}
