import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "front-end-common";
import {ProfileService} from "../../../../front-end-common/src/providers/profile/profile.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public auth: AuthService,
    public profile: ProfileService,
    public navCtrl: NavController
  ) {

  }

}
