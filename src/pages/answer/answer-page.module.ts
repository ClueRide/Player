import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswerPage } from './answer-page';

@NgModule({
  declarations: [
    AnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(AnswerPage),
  ],
})
export class AnswerPageModule {}
