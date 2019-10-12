import {AnswerKey, Puzzle, PuzzleService} from "front-end-common";
import {AnswerPage} from "../answer/answer-page";
import {AnswerSummaryService} from "../../providers/answer-summary/answer-summary.service";
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GuideEventService} from "../../providers/guide-event-service/guide-event-service";
import {Title} from "@angular/platform-browser";

/**
 * Presents the current puzzle to the player.
 *
 * The current puzzle is taken from the Game State Service.
 */

@IonicPage()
@Component({
  selector: 'page-puzzle',
  templateUrl: 'puzzle.html',
})
export class PuzzlePage {

  puzzle: Puzzle = new Puzzle();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private guideEventService: GuideEventService,
    private puzzleService: PuzzleService,
    private answerSummaryService: AnswerSummaryService,
    public titleService: Title,
  ) {
    console.log("Hello Puzzle Page");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PuzzlePage');
  }

  ionViewDidEnter() {
    let puzzleId = this.navParams.get('id');
    console.log("PuzzlePage.ionViewDidEnter; puzzleId = ", puzzleId);
    this.titleService.setTitle("Puzzle");
    this.puzzle = this.puzzleService.getPuzzle(
      puzzleId
    );
  }

  /**
   * Responds to selection of an answer by the player.
   * @param choice
   */
  selectAsAnswer(choice: string) {
    this.answerSummaryService.postAnswer(this.puzzle.id, AnswerKey[choice]).subscribe(
      (answerSummary) => {
        console.log("Got answer summary");
        this.navCtrl.push(AnswerPage, {
          "activePuzzle": this.puzzle,
          "answerSummary": answerSummary
        });
      }
    );
  }

  // TODO: PLAY-50
  /** Check to see if we can provide Guide components. */
  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  // TODO: PLAY-50
  /** Guide is able to indicate that we're ready for the next Attraction. */
  signalPuzzleSolved() {
    this.guideEventService.sendDeparture();
  }

}
