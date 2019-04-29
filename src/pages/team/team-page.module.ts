import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SummaryComponentsModule} from "../../components/components.module";
import {TeamPage} from './team-page';
import {MemberChipComponentModule} from "front-end-common";

@NgModule({
  declarations: [
    TeamPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamPage),
    SummaryComponentsModule,
    MemberChipComponentModule,
  ],
})
export class TeamPageModule {}
