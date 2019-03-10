import {AnswerSummary} from "../../providers/answer-summary/answer-summary";
import {AnswerSummaryService} from "../../providers/answer-summary/answer-summary.service";
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Puzzle} from "front-end-common";
import {GuideEventService} from "../../providers/guide-event-service/guide-event-service";

/**
 * Presents the answers to the puzzle along with updates from other players via
 * the Answer Summary stream.
 */
@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {

  public puzzle: Puzzle;
  public answerSummary: AnswerSummary;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private guideEventService: GuideEventService,
    private answerSummaryService: AnswerSummaryService,
  ) {
    this.puzzle = navParams.get("activePuzzle");
    this.answerSummary = navParams.get("answerSummary");
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AnswerPage');
    this.answerSummaryService.openAnswerSummaryChannel()
      .subscribe(answerSummary => {
        this.answerSummary = answerSummary
      });
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave AnswerPage');
    this.answerSummaryService.closeAnswerSummaryChannel();
  }

  //TODO: PLAY-50 Refactor into separate component
  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  //TODO: PLAY-50 Refactor into separate component
  signalPuzzleSolved() {
    this.guideEventService.sendDeparture();
  }

  public isCorrectAnswer(answer: string): boolean {
     return this.answerSummary.correctAnswer.toString() === answer;
  }

}
