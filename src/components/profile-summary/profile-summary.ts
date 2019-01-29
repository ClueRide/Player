import {Component} from '@angular/core';
import {ProfileService} from "front-end-common";

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

  constructor(
    public profile: ProfileService
  ) {
  }

}
