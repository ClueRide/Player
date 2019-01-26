import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {App, NavController} from "ionic-angular";

/** Handles app-specific push/pop to avoid having to use
 * setRoot to navigate.
 */
@Injectable()
export class NavService {

  /* Tracks where we currently are */
  private navState = {
    currentPageName: "HomePage",
    targetPageName: "",
  };

  /* Given a page, tell us what push level. */
  private levelPerPage = {
    HomePage: 0,
    OutingPage: 1,
    BadgesPage: 1,
    TeamPage: 1,
    RollingPage: 1,
    LocationPage: 2,
    PuzzlePage: 1,
    AnswerPage: 2,
  };

  /* Subject that we use to let callers know the page has transitioned. */
  private navStateSubject: Subject<string> = new Subject();
  private navStateObservable: Observable<string> = this.navStateSubject.asObservable();

  constructor(
    public app: App
  ) {
    console.log('Hello NavService Provider');
  }

  public goToPage(caseInsensitivePageName: string): Observable<string> {
    // let pageName = caseInsensitivePageName.toLowerCase();
    let pageName = caseInsensitivePageName;
    console.log("Go To " + pageName + " from " + this.navState.currentPageName);
    if (this.isMoveAllowed(pageName)) {
      if (this.isHeadedToLevel2withPush(pageName)) {
        this.recordPush(pageName);
      } else if (this.isAtHome()) {
        this.recordPush(pageName);
      } else if (this.areBothLevel1(pageName)) {
        this.recordPopThenPush(pageName);
      } else if (this.isAtLocation()) {
        this.takeLocationTo(pageName);
      } else if (this.isHeadedHome(pageName)) {
        this.recordPop(pageName);
      } else {
        console.log("Unexpected move from " + this.navState.currentPageName + " to " + pageName);
      }
    }
    return this.navStateObservable;
  }

  private recordPush(pageName: string) {
    console.log("Pushing " + pageName);
    this.navState.targetPageName = pageName;
    (<NavController>this.app.getRootNavById('n4')).push(pageName)
      .then(
        () => {
          const newPageName = this.navState.targetPageName;
          this.navStateSubject.next(newPageName);
          this.navState.currentPageName = newPageName;
          this.navState.targetPageName = "";
        }
      );
  }

  private recordPopThenPush(pageName: string) {
    console.log("Pop once then ... ");
    this.navState.targetPageName = pageName;
    (<NavController>this.app.getRootNavById('n4')).pop()
      .then(
        () => {
          this.recordPush(this.navState.targetPageName);
        }
      );
  }

  private recordPop(pageName: string) {
    console.log("Popping");
    this.navState.targetPageName = pageName;
    (<NavController>this.app.getRootNavById('n4')).pop()
      .then(
        () => {
          const newPageName = this.navState.targetPageName;
          this.navStateSubject.next(newPageName);
          this.navState.currentPageName = newPageName;
          this.navState.targetPageName = "";
        }
      );
  }

  private record2PopsThenPush(pageName: string) {
    console.log("Pop twice then ... ");
    this.navState.targetPageName = pageName;
    (<NavController>this.app.getRootNavById('n4')).pop()
      .then(
        () => {
          (<NavController>this.app.getRootNavById('n4')).pop()
            .then(
              () => {
                this.recordPush(this.navState.targetPageName);
              }
            );
        }
      );
  }

  private record2Pops(pageName: string) {
    console.log("Pop once then ... ");
    this.navState.targetPageName = pageName;
    (<NavController>this.app.getRootNavById('n4')).pop()
      .then(
        () => {
          this.recordPop(this.navState.targetPageName);
        }
      );
  }

  /* We're at Location, and are headed somewhere else. */
  private takeLocationTo(pageName: string) {
    if (pageName == 'rolling') {
      this.recordPop(pageName);
    } else if (this.levelPerPage[pageName] == 1) {
      this.record2PopsThenPush(pageName);
    } else if (this.levelPerPage[pageName] == 0) {
      this.record2Pops(pageName);
    } else {
      console.log("Unexpected move from " + this.navState.currentPageName + " to " + pageName);
    }
  }

  /* Filter out disallowed moves. */
  private isMoveAllowed(pageName: string): boolean {
    if (this.navState.currentPageName == 'PuzzlePage' && pageName != 'AnswerPage' && pageName != 'RollingPage') {
      console.log("Can't move to " + pageName + ". Currently in PuzzlePage.");
      return false;
    }

    if (this.navState.currentPageName == 'AnswerPage' && pageName != 'RollingPage') {
      console.log("Can't move to " + pageName + ". Currently in AnswerPage.");
      return false;
    }

    if (this.navState.currentPageName == pageName) {
      console.log("Action not taken to remain in " + pageName + ". Currently in " + pageName + ".");
      return false;
    }

    return true;
  }

  private isHeadedToLevel2withPush(pageName: string): boolean {
    if (this.levelPerPage[pageName] == 2) {
      if (this.navState.currentPageName == 'RollingPage' && pageName == 'LocationPage') {
        return true;
      }

      if (this.navState.currentPageName == 'PuzzlePage' && pageName == 'AnswerPage') {
        return true;
      }

      console.log("Can't move to " + pageName + " from " + this.navState.currentPageName);
    }
    return false;
  }

  private isAtHome(): boolean {
    return (this.navState.currentPageName == 'HomePage');
  }

  private areBothLevel1(pageName: string): boolean {
    return (this.levelPerPage[pageName] == 1 && this.levelPerPage[this.navState.currentPageName] == 1);
  }

  private isAtLocation(): boolean {
    return (this.navState.currentPageName == 'LocationPage');
  }

  private isHeadedHome(pageName: string): boolean {
    return (pageName == 'HomePage');
  }

}
