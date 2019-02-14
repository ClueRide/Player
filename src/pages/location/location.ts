import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Location, LocationService} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {LoadStateService} from "../../providers/load-state/load-state.service";

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

  /* Initialize to empty object. */
  public location: Location = {
    id: null,
    name: "",
    description: "",
    latLon: null,
    geoJson: null,
    featuredImage: {
      id: null,
      url: null
    }
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
    public locationService: LocationService,
    public loadStateService: LoadStateService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    if (this.loadStateService.isLoadComplete()) {
      this.location = this.locationService.getLocation(
        this.navParams.get("id")
      );
    }
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Location");
  }

}
