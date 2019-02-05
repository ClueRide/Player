import {
  Course,
  CourseService,
  LocationService,
  OutingService,
  OutingView,
  PuzzleService,
  TeamService,
} from "front-end-common";
import {Injectable} from '@angular/core';
import {GameStateService} from "../game-state/game-state.service";
import {GameState} from "../game-state/game-state";
import {ServerEventsService} from "../server-events/server-events.service";
import {Subject, Observable} from "../../../../front-end-common/node_modules/rxjs";

/** Service for being smart about getting all cached up
 * with a given Outing, and waits until it has the GameState
 * before it will report that we're all cached up.
 *
 * See http://bikehighways.wikidot.com/caching-services
 * for a diagram that helps see what's dependent on what.
 */
@Injectable()
export class LoadStateService {

  private outing: OutingView;
  private course: Course;
  private gameState: GameState;
  private allCachedUp: boolean = false;
  private loadInProgress: boolean = false;
  public loadStateSubject: Subject<boolean> = new Subject<boolean>();
  public loadStateObservable: Observable<boolean> = this.loadStateSubject.asObservable();

  constructor(
    private outingService: OutingService,
    private courseService: CourseService,
    private gameStateService: GameStateService,
    private locationService: LocationService,
    private serverEventsService: ServerEventsService,
    private puzzleService: PuzzleService,
    private teamService: TeamService,
  ) {
    console.log('Hello LoadStateService');
  }

  /**
   * Set to true once all data has been sequentially loaded.
   */
  public isLoadComplete(): boolean {
    return this.allCachedUp;
  }

  /**
   * In sequence, brings in the entire set of data for a course.
   */
  public loadOutingData() {
    if (this.isLoadComplete()) {
      console.log("Load is Complete");
      return;
    }
    if (this.loadInProgress) {
      console.log("Load is in Progress");
      return;
    }
    this.outingService.getSessionOuting()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      (response) => {
        this.outing = <OutingView> response;
        /* Kick off loads of everything needing the Outing ID: */
        this.loadCourseData();
        this.teamService.loadTeam(this.outing.teamId);
      }
    );
  }

  private loadCourseData() {
    this.courseService.getSessionCourse()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      (response) => {
        this.course = response;
        this.loadLocationData();
      }
    );

  }

  private loadLocationData() {
    this.locationService.loadSessionLocations()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      (response) => {
        this.loadPuzzleData();
      }
    );

  }

  private loadPuzzleData() {
    this.puzzleService.loadSessionPuzzles()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      (response) => {
        this.loadGameState();
      }
    );
  }

  private loadGameState() {
    this.gameStateService.requestGameState()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      (response) => {
        /* Signal we're done. */
        this.loadStateSubject.next(true);
        this.gameState = response;
        this.allCachedUp = true;
        this.serverEventsService.initializeSubscriptions(
          this.outing.id
        );
        console.log("Completed loading Course, Location, Game State and Puzzles");
      }
    );
  }


}
