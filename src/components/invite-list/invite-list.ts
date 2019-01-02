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

  inviteService: InviteService;
  invites: Array<Invite>;

  constructor(
    inviteService: InviteService,
  ) {
    console.log('Hello InviteListComponent Component');
    this.inviteService = inviteService;
  }

  ngOnInit() {
    this.inviteService.myInvites().subscribe(
      (response) => {
        this.invites = response;
      }
    );
  }

  public acceptInvite(inviteId) {
    this.inviteService.accept(inviteId).subscribe(
      () => {
        // location.reload();
      }
    );
  }

  public declineInvite(inviteId) {
    this.inviteService.decline(inviteId).subscribe(
      () => {
        // location.reload();
      }
    );
  }

}
