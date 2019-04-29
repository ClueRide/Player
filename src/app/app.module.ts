import {ErrorHandler, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppVersion} from "@ionic-native/app-version";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {ComponentsModule, MemberChipComponentModule} from "front-end-common";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {SummaryComponentsModule} from "../components/components.module";

import {AboutPage} from "../pages/about/about";
import {AboutPageModule} from "../pages/about/about.module";
import {AnswerPage} from "../pages/answer/answer-page";
import {AnswerPageModule} from "../pages/answer/answer-page.module";
import {BadgesPage} from "../pages/badges/badges";
import {BadgesPageModule} from "../pages/badges/badges.module";
import {HomePage} from "../pages/home/home";
import {InvitePage} from "../pages/invite/invite";
import {InvitePageModule} from "../pages/invite/invite.module";
import {LocationPage} from "../pages/location/location";
import {LocationPageModule} from "../pages/location/location.module";
import {MarkerService} from '../providers/marker-service/marker-service';
import {OutingPage} from "../pages/outing/outing";
import {OutingPageModule} from "../pages/outing/outing.module";
import {PuzzlePage} from "../pages/puzzle/puzzle-page";
import {PuzzlePageModule} from "../pages/puzzle/puzzle-page.module";
import {RollingPage} from "../pages/rolling/rolling";
import {RollingPageModule} from "../pages/rolling/rolling.module";
import {TeamPage} from "../pages/team/team-page";
import {TeamPageModule} from "../pages/team/team-page.module";
import {AnswerSummaryService} from '../providers/answer-summary/answer-summary.service';
import {AppStateService} from '../providers/app-state/app-state.service';
import {GameStateService} from "../providers/game-state/game-state.service";
import {GuideEventService} from '../providers/guide-event-service/guide-event-service';
import {LoadStateService} from '../providers/load-state/load-state.service';
import {PageRoutingService} from '../providers/page-routing/page-routing.service';
import {ServerEventsService} from "../providers/server-events/server-events.service";
import {MyApp} from "./app.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    AboutPageModule,
    AnswerPageModule,
    BadgesPageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule.forRoot(),
    InvitePageModule,
    LocationPageModule,
    MemberChipComponentModule,
    PuzzlePageModule,
    RollingPageModule,
    OutingPageModule,
    SummaryComponentsModule,
    TeamPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AnswerPage,
    BadgesPage,
    HomePage,
    InvitePage,
    LocationPage,
    OutingPage,
    PuzzlePage,
    RollingPage,
    TeamPage,
  ],
  providers: [
    AnswerSummaryService,
    AppVersion,
    AppStateService,
    GameStateService,
    GuideEventService,
    LoadStateService,
    MarkerService,
    PageRoutingService,
    ServerEventsService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})

export class AppModule {}
