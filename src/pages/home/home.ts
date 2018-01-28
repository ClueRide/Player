import { Component } from '@angular/core';
import {AuthService} from "front-end-common";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public auth: AuthService,
  ) {
  }

}
