import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { FirebaseListObservable } from 'angularfire2';

import { MessagePage } from '../message/message';

@Component({
  selector: 'page-convo',
  templateUrl: 'convo.html'
})
export class ConvoPage {
  userProfile: FirebaseListObservable<any>;
  convoList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User) {
    //load Current User Infos
    user.loadProfile();
    this.userProfile = user.userfromdb;
    this.convoList  = user.getFullUserConvos();
  }
  read(id:string){
    //console.log(id);
    this.navCtrl.setRoot(MessagePage, {
    id: id
    });
  }


}
