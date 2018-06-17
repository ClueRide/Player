import {NgModule} from "@angular/core";
import {OutingSummaryComponent} from "./outing-summary/outing-summary";
import {BadgeSummaryComponent} from "./badge-summary/badge-summary";
import {ProfileSummaryComponent} from "./profile-summary/profile-summary";
import {BeginGameComponent} from "./begin-game/begin-game";
import { PinnedMapComponent } from './pinned-map/pinned-map';
import {CommonModule} from "@angular/common";

@NgModule({
	declarations: [
    OutingSummaryComponent,
    BadgeSummaryComponent,
    ProfileSummaryComponent,
    BeginGameComponent,
    PinnedMapComponent
  ],
	imports: [
	  CommonModule
  ],
	exports: [
    OutingSummaryComponent,
    BadgeSummaryComponent,
    ProfileSummaryComponent,
    BeginGameComponent,
    PinnedMapComponent
  ]
})

export class SummaryComponentsModule {}
