import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {RollingPage} from "./rolling";

@NgModule({
  declarations: [
    RollingPage,
  ],
  imports: [
    IonicPageModule.forChild(RollingPage),
  ],
})
export class RollingPageModule {}
