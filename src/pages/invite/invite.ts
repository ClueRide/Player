import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Invite, InviteService} from "front-end-common";
import {Title} from "@angular/platform-browser";

/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {

  inviteService: InviteService;
  invites: Array<Invite>;

  constructor(
    inviteService: InviteService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public titleService: Title,
  ) {
    this.inviteService = inviteService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
    this.inviteService.myInvites().subscribe(
      (response) => {
        this.invites = response;
      }
    );
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Invite");
  }


  ngOnInit() {
  }

  public haveActiveInvite() {
    return this.invites && this.invites.length > 0;
  }

}
