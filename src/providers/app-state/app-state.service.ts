import {App, NavController} from "ionic-angular";
import {AppState} from "./app-state";
import {Injectable} from "@angular/core";
import {
  InviteService,
  OutingService,
  RegistrationPage,
  SessionInviteState
} from "front-end-common";
import {HomePage} from "../../pages/home/home";
import {InvitePage} from "../../pages/invite/invite";

/**
 * Provides the logic for arranging Application State changes:
 * - Needs Registration.
 * - Ready to Play; we have an accepted invitation and outing.
 * - Outstanding Invitation to be accepted.
 * - No outing or invitation.
 * Much of the logic is implemented on the server -- the InviteService
 * uses the REST end-point that returns Invitation State for a given session.
 */
@Injectable()
export class AppStateService {

  private nav: NavController;

  constructor(
    public app: App,
    public inviteService: InviteService,
    private outingService: OutingService,
  ) {
  }

  /**
   * Based on the inbound AppState, transition to the next state.
   *
   * NOTE: This is similar to the approach taken for GameState, but
   * there may be existing routing and state code from Angular to
   * handle this feature.
   *
   * @param appState
   */
  prepareAndShowPage(appState: AppState): Promise<void> {
    let pageReadyPromise: Promise<void>;

    this.nav = <NavController>this.app.getRootNavById('n4');

    switch(appState) {
      case AppState.UNREGISTERED:
        console.log("Headed to the Registration Page");
        pageReadyPromise = this.nav.setRoot(RegistrationPage);
        break;

      case AppState.READY_TO_PLAY:
        console.log("Headed to the Home Page");
        this.outingService.getSessionOuting().subscribe(
          /* Not used here; we're pre-populating the cache. */
          () => {}
        );
        pageReadyPromise = this.nav.setRoot(HomePage);
        break;

      case AppState.INVITED:
        console.log("Headed to the Invite Page");
        pageReadyPromise = this.nav.setRoot(InvitePage);
        break;

      case AppState.NO_INVITES:
        // TODO: Temporary until we create the new page
        console.log("Headed to the Home Page - No Invites");
        pageReadyPromise = this.nav.setRoot(HomePage);
        break;

      default:
      case AppState.EXCEPTION:
        // TODO: Define an Exception page (maybe the server is down?)
        console.log("Unrecognized state: " + appState);
        break;
    }

    return pageReadyPromise;
  }

  /**
   * Opens either the Home Page for an outing, the Invitation Page for
   * an open invitation, or a new page yet to be figured out if user
   * has no current invitations or outings.
   */
  public async checkInviteIsAccepted(): Promise<void> {
    let pagePromise: Promise<void> = new Promise(
      resolve => {}
    );

    await this.inviteService.inviteState().subscribe(
      (inviteState) => {
        switch (SessionInviteState[inviteState]) {
          case SessionInviteState.ACCEPTED_INVITE:
            pagePromise = this.prepareAndShowPage(AppState.READY_TO_PLAY);
            break;
          case SessionInviteState.OPEN_INVITE:
          case SessionInviteState.DECLINED_INVITES:
            pagePromise = this.prepareAndShowPage(AppState.INVITED);
            break;
          case SessionInviteState.NO_INVITES:
          case SessionInviteState.MULTIPLE_INVITES:
          default:
            pagePromise = this.prepareAndShowPage(AppState.INVITED);
                break;
        }
      }
    );

    return pagePromise;
  }

}

