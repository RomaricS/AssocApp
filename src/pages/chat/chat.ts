import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
  })

export class ChatPage {
messages: FirebaseListObservable<any>;
message:string;
mesInfos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User) {
    user.loadProfile();
    this.messages = user.getMessages();
    this.mesInfos = user.userfromdb;
  }

sendMessage(nom:string, pren:string, mail:string){
  //console.log(this.message);
  this.user.sendMessage(this.message, nom, pren, mail);
  this.message="";
}


}
