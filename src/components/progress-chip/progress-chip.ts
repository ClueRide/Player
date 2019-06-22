import {Component, Input} from '@angular/core';
import {BadgeProgress} from "front-end-common";

/**
 * Generated class for the ProgressChipComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-chip',
  templateUrl: 'progress-chip.html'
})
export class ProgressChipComponent {

  @Input() chip: BadgeProgress;

  constructor() {
    console.log('Hello ProgressChipComponent Component');
  }

}
