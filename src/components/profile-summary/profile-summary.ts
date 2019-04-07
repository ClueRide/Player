import {Component, Input} from '@angular/core';
import {Member} from "../../../../front-end-common/src/providers/profile/member";

/**
 * Generated class for the ProfileSummaryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-summary',
  templateUrl: 'profile-summary.html'
})
export class ProfileSummaryComponent {

  @Input() profile: Member;

  constructor(
  ) {

  }

}
