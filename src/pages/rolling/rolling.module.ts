import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RollingPage } from './rolling';
import {SummaryComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    RollingPage,
  ],
  imports: [
    IonicPageModule.forChild(RollingPage),
    SummaryComponentsModule
  ],
})
export class RollingPageModule {}
