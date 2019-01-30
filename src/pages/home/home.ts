import {Component} from "@angular/core";
import {
  AuthService,
  Course,
  CourseService,
  LocationService,
  OutingService,
  OutingView,
  ProfileService,
  PuzzleService,
  TeamService,
} from "front-end-common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private outing: OutingView;
  private course: Course;

  constructor(
    /* Used on the HTML page: */
    public auth: AuthService,

    private outingService: OutingService,
    private courseService: CourseService,
    private locationService: LocationService,
    private profileService: ProfileService,
    private puzzleService: PuzzleService,
    private teamService: TeamService,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    this.profileService.loadMemberProfile();
    this.loadOutingData();
  }

  /**
   * In sequence, brings in the entire set of data for a course.
   */
  private loadOutingData() {
    this.outingService.getSessionOuting().subscribe(
      (response) => {
        this.outing = <OutingView> response;
        /* Kick off loads of everything needing the Outing ID: */
        this.loadCourseData();
        this.teamService.loadTeam(this.outing.teamId);
      }
    );
  }

  private loadCourseData() {
    this.courseService.getSessionCourse().subscribe(
      (response) => {
        this.course = response;
        this.loadLocationData();
      }
    );

  }

  private loadLocationData() {
    this.locationService.loadSessionLocations().subscribe(
      (response) => {
        this.loadPuzzleData();
      }
    );

  }

  private loadPuzzleData() {
    this.puzzleService.loadSessionPuzzles().subscribe(
      (response) => {
        console.log("Completed loading Course, Location, and Puzzles");
      }
    );
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Home");
  }
}
