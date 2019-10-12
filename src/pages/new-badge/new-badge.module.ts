import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBadgePage } from './new-badge';

@NgModule({
  declarations: [
    NewBadgePage,
  ],
  imports: [
    IonicPageModule.forChild(NewBadgePage),
  ],
})
export class NewBadgePageModule {}
