import {
  AttractionService,
  CourseService,
  OutingService,
  OutingView,
  PathService,
  PuzzleService,
  TeamService,
} from "front-end-common";
import {Injectable} from '@angular/core';
import {GameStateService} from "../game-state/game-state.service";
import {ServerEventsService} from "../server-events/server-events.service";
import {Observable, Subject} from "../../../../front-end-common/node_modules/rxjs";

/**
 * Service for being smart about getting all cached up
 * with a given Outing, and waits until it has the GameState
 * before it will report that we're all cached up.
 *
 * This service doesn't hold any of the cached data -- the
 * individual services do that. Only the state of loading
 * is tracked here.
 *
 * See http://bikehighways.wikidot.com/caching-services
 * for a diagram that helps see what's dependent on what.
 */
@Injectable()
export class LoadStateService {

  private outing: OutingView;
  private allCachedUp: boolean = false;
  private loadInProgress: boolean = false;
  public loadStateSubject: Subject<boolean>;
  public loadStateObservable: Observable<boolean>;

  constructor(
    private outingService: OutingService,
    private courseService: CourseService,
    private gameStateService: GameStateService,
    private attractionService: AttractionService,
    private pathService: PathService,
    private serverEventsService: ServerEventsService,
    private puzzleService: PuzzleService,
    private teamService: TeamService,
  ) {
    console.log('Hello LoadStateService');
    this.loadStateSubject = new Subject<boolean>();
    this.loadStateObservable = this.loadStateSubject.asObservable();
  }

  /**
   * Set to true once all data has been sequentially loaded.
   */
  public isLoadComplete(): boolean {
    return this.allCachedUp;
  }

  public getLoadStateObservable(): Observable<boolean> {
    return this.loadStateObservable;
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
      (course) => {
        /* Kick off loads of everything needing the Course. */
        this.loadLocationData();
        this.pathService.loadPaths(course);
      }
    );

  }

  private loadLocationData() {
    this.attractionService.loadSessionAttractions()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      () => {
        this.loadPuzzleData();
      }
    );

  }

  private loadPuzzleData() {
    this.puzzleService.loadSessionPuzzles()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      () => {
        this.loadGameState();
      }
    );
  }

  private loadGameState() {
    /* This service doesn't use the game state.
     * It only makes sure the server has game state available before proceeding. */
    this.gameStateService.requestGameState()
      .takeUntil(this.loadStateObservable)
      .subscribe(
      () => {
        /* Signal we're done. */
        console.log("Completed loading Course, Location, Game State and Puzzles");
        this.allCachedUp = true;

        /* Turns on SSE against our session's Outing ID. */
        // TODO: PLAY-22 When does this turn off? Application life-cycle?
        this.serverEventsService.initializeSubscriptions(
          this.outing.id
        );

        /* Let rest of world know. */
        this.loadStateSubject.next(true);
      }
    );
  }


}
