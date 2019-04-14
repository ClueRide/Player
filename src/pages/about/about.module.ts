import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import {SummaryComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    SummaryComponentsModule
  ],
})
export class AboutPageModule {}
