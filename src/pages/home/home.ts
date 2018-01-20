import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthService, Badge, BadgeService} from "front-end-common";
import {ProfileService} from "../../../../front-end-common/src/providers/profile/profile.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  badges: Array<Badge>

  constructor(
    public auth: AuthService,
    public badgeService: BadgeService,
    public profile: ProfileService,
    public navCtrl: NavController
  ) {

  }

  ngOnInit() {
    this.badgeService.getList().subscribe(
      (response) => {
        this.badges = response;
      }
    );
  }

}
