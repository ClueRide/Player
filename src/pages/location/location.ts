import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Location, LocationService} from "front-end-common";
import {Title} from "@angular/platform-browser";

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public location: Location;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
    public locationService: LocationService,
  ) {
    this.location = this.locationService.getLocation(
      navParams.get("id")
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Location");
  }

}
