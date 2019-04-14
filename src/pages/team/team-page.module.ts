import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TeamPage} from './team-page';
import {SummaryComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    TeamPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamPage),
    SummaryComponentsModule,
  ],
})
export class TeamPageModule {}
