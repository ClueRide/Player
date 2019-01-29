import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TeamPage} from './team-page';

@NgModule({
  declarations: [
    TeamPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamPage),
  ],
})
export class TeamPageModule {}
