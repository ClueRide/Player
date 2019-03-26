import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Attraction, AttractionService, Image} from "front-end-common";
import {Title} from "@angular/platform-browser";
import {LoadStateService} from "../../providers/load-state/load-state.service";

/**
 * Presents the current Attraction to the player.
 */
@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  /* Initialize to empty object. */
  public attraction: Attraction = new Attraction();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
    public attractionService: AttractionService,
    public loadStateService: LoadStateService,
  ) {
    console.log("Hello Location/Attraction Page");
    this.attraction.featuredImage = <Image>{};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    if (this.loadStateService.isLoadComplete()) {
      this.attraction = this.attractionService.getAttraction(
        this.navParams.get("id")
      );
    }
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Location");
  }

}
