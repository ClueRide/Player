import {NgModule} from "@angular/core";
import {OutingSummaryComponent} from "./outing-summary/outing-summary";
import {BadgeSummaryComponent} from "./badge-summary/badge-summary";
import {ProfileSummaryComponent} from "./profile-summary/profile-summary";
import {BeginGameComponent} from "./begin-game/begin-game";
@NgModule({
	declarations: [
    OutingSummaryComponent,
    BadgeSummaryComponent,
    ProfileSummaryComponent,
    BeginGameComponent
  ],
	imports: [],
	exports: [
    OutingSummaryComponent,
    BadgeSummaryComponent,
    ProfileSummaryComponent,
    BeginGameComponent
  ]
})
export class SummaryComponentsModule {}
