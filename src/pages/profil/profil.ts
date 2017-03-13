import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { FirebaseListObservable } from 'angularfire2';

import { EditUserPage } from '../edit-user/edit-user';
import { PostPage } from '../post/post';

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

  edit(user){
    this.navCtrl.push(EditUserPage, {
      key : user.$key,
      pren : user.prenom,
      nom : user.nom,
      mail : user.email,
      pass : user.password,
      prof : user.prof,
      img : user.image
    });
  }

  createPost(){
    this.navCtrl.setRoot(PostPage);
  }
}
