import {Injectable} from '@angular/core';
import {App, NavController} from "ionic-angular";
import {Subscription} from "rxjs/Subscription";
import {PuzzlePage} from "../../pages/puzzle/puzzle-page";
import {RollingPage} from "../../pages/rolling/rolling";
import {GameStateService} from "../game-state/game-state.service";

/**
 * Watches Game State to decide where routing should go.
 */
@Injectable()
export class PageRoutingService {

  private subscription: Subscription;
  private nav: NavController;

  constructor(
    private app: App,
    private gameStateService: GameStateService,
  ) {
    console.log('Hello PageRoutingService Provider');
    this.nav = <NavController>this.app.getRootNavById('n4');
    this.subscription = new Subscription();
    this.setupSubscriptions();
  }

  /**
   * Decide which page to show next based on the updated GameState received.
   */
  setupSubscriptions() {
    this.subscription.add(
      this.gameStateService.puzzleEvents()
        .subscribe(
          (gameState) => this.goToPuzzle(gameState.puzzleId)
        )
    );
    this.subscription.add(
      this.gameStateService.rollingEvents()
        .subscribe(
          (gameState) => this.goToRolling()
        )
    );
  }

  goToPuzzle(puzzleId: number): void {
    console.log("Arrival Event: Puzzle time");

    /* Case where we send out a Puzzle to be solved. */
    this.nav.setRoot(
      PuzzlePage,
      {id: puzzleId}
    );
  }

  goToRolling(): void {
    console.log("Depart Event: Rolling");

    /* Ready to show our position on the map. */
    this.nav.setRoot(
      RollingPage
    );
  }

  // TODO: PLAY-60 Begin/Resume
  public beginGame(): void {
    let nav = <NavController>this.app.getRootNavById('n4');
    this.gameStateService.requestGameState()
      .take(1)
      .subscribe(
        (gameState) => {
          if (gameState.pathIndex < 0
            || !gameState.teamAssembled
            || gameState.rolling
          ) {
            nav.setRoot(
              RollingPage
            );
          } else {
            nav.setRoot(
              PuzzlePage,
              {id: gameState.puzzleId}
            );
          }
        }
      );
  }

}
