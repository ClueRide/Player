import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InvitePage} from './invite';
import {SummaryComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    InvitePage,
  ],
  imports: [
    IonicPageModule.forChild(InvitePage),
    SummaryComponentsModule,
  ],
})
export class InvitePageModule {}
