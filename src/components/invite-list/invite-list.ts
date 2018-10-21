import { Component } from '@angular/core';
import {Invite, InviteService} from "front-end-common";

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
  inviteService: InviteService;
  invites: Array<Invite>;

  constructor(
    inviteService: InviteService,
  ) {
    console.log('Hello InviteListComponent Component');
    this.text = 'Hello World';
    this.inviteService = inviteService;
  }

  ngOnInit() {
    this.inviteService.myInvites().subscribe(
      (response) => {
        this.invites = response;
      }
    );
  }

}
