import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {RollingPage} from "./rolling";
import {SummaryComponentsModule} from "../../components/components.module";
import {Resource} from "../../providers/resources/resource";

@NgModule({
  declarations: [
    RollingPage,
  ],
  imports: [
    IonicPageModule.forChild(RollingPage),
    SummaryComponentsModule
  ],
  providers: [
    Resource
  ]
})
export class RollingPageModule {}
