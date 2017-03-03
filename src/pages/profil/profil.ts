import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { User } from '../../providers/user';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage {
  userProfile: FirebaseListObservable<any>;
  mailState;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User) {
    user.loadProfile();
    this.userProfile = user.userfromdb;
  }
}
