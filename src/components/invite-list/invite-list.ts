import { Component } from '@angular/core';

/**
 * Generated class for the InviteListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'invite-list',
  templateUrl: 'invite-list.html'
})
export class InviteListComponent {

  text: string;

  constructor() {
    console.log('Hello InviteListComponent Component');
    this.text = 'Hello World';
  }

}
