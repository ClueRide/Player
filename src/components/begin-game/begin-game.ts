import { Component } from '@angular/core';

/**
 * Generated class for the BeginGameComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'begin-game',
  templateUrl: 'begin-game.html'
})
export class BeginGameComponent {

  constructor() {
  }

  public beginGame() {
    console.log('Beginning Game');
    alert("Beginning Game");
  }

}
