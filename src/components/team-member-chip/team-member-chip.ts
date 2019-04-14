import {Component, Input} from '@angular/core';
import {Member} from "../../../../front-end-common/src/providers/profile/member";

/**
 * Generated class for the TeamMemberChipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'team-member-chip',
  templateUrl: 'team-member-chip.html'
})
export class TeamMemberChipComponent {

  @Input() member: Member;

  constructor() {
  }

}
