import {Component} from "@angular/core";
import {AuthService} from "front-end-common";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public auth: AuthService,
    public titleService: Title,
  ) {
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Home");
  }

}
