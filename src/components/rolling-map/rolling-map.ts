import {Component, Input} from "@angular/core";
import {Outing} from "../../providers/resources/outing/outing";

@Component({
  selector: 'rolling-map',
  templateUrl: 'rolling-map.html'
})
export class RollingMapComponent {

  @Input() memberId: Number;
  @Input() outing: Outing;

  constructor() {
    console.log('Hello RollingMapComponent Component');
  }

  public isGuide(): boolean {
    return this.memberId
      && this.outing
      && this.outing.guideMemberId
      && this.outing.guideMemberId === this.memberId;
  }

}
