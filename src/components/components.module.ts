import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicPageModule} from 'ionic-angular';

import {BadgeSummaryComponent} from "./badge-summary/badge-summary";
import {BeginGameComponent} from "./begin-game/begin-game";
import {InviteListComponent} from './invite-list/invite-list';
import {OutingSummaryComponent} from "./outing-summary/outing-summary";
import {PinnedMapComponent} from './pinned-map/pinned-map';
import {ProfileSummaryComponent} from "./profile-summary/profile-summary";
import {RollingMapComponent} from './rolling-map/rolling-map';

@NgModule({
	declarations: [
    OutingSummaryComponent,
    BadgeSummaryComponent,
    BeginGameComponent,
    InviteListComponent,
    PinnedMapComponent,
    ProfileSummaryComponent,
    RollingMapComponent,
  ],
	imports: [
    IonicPageModule,
	  CommonModule
  ],
	exports: [
    OutingSummaryComponent,
    BadgeSummaryComponent,
    BeginGameComponent,
    InviteListComponent,
    PinnedMapComponent,
    ProfileSummaryComponent,
    RollingMapComponent,
  ]
})

export class SummaryComponentsModule {}
