import { Component } from '@angular/core';

@Component({
  selector: 'rolling-map',
  templateUrl: 'rolling-map.html'
})
export class RollingMapComponent {

  constructor() {
    console.log('Hello RollingMapComponent Component');
  }

  public isGuide(): boolean {
    return true;
  }

}
