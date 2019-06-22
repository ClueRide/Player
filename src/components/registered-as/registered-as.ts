import {Component, Input} from '@angular/core';
import {Member} from "../../../../front-end-common/src/providers/profile/member";

/**
 * Generated class for the RegisteredAsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'registered-as',
  templateUrl: 'registered-as.html'
})
export class RegisteredAsComponent {

  @Input() member: Member;

  constructor() {
    console.log('Hello RegisteredAsComponent Component');
  }

}
