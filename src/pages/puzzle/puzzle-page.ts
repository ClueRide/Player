import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {LocationService, Puzzle, PuzzleService} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {GuideEventService} from "../../providers/guide-event-service/guide-event-service";

/**
 * Generated class for the PuzzlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-puzzle',
  templateUrl: 'puzzle.html',
})
export class PuzzlePage {

  private puzzles: Puzzle[];
  puzzle: Puzzle = new Puzzle();

  constructor(
    private guideEventService: GuideEventService,
    private puzzleService: PuzzleService,
    private locationService: LocationService,
    public titleService: Title,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PuzzlePage');

    let locationId = this.locationService.getCurrentLocationId();
    this.puzzles = this.puzzleService.getPuzzlesPerLocationId(locationId);
    if (this.puzzles && this.puzzles.length > 0) {
      this.puzzle = this.puzzles[0];
    }
  }

  ionViewDidEnter() {
    console.log("PuzzlePage.ionViewDidEnter");
    this.titleService.setTitle("Puzzle");
  }

  public isGuide(): boolean {
    return this.guideEventService.isCurrentMemberGuide();
  }

  signalPuzzleSolved() {
    this.guideEventService.sendDeparture();
  }

}
