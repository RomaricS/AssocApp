import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { FirebaseListObservable } from 'angularfire2';

import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
  })

export class ChatPage {
messages: FirebaseListObservable<any>;
message:string;
mesInfos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user:User,public push: Push) {
    user.loadProfile();
    this.messages = user.getMessages();
    this.mesInfos = user.userfromdb;

/*
//notif
      this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });

//suscribe to notif observable
    this.push.rx.notification()
  .subscribe((msg) => {
    alert(msg.title + ': ' + msg.text);
  });*/

  }



sendMessage(nom:string, pren:string, mail:string){
  //console.log(this.message);
  this.user.sendMessage(this.message, nom, pren, mail);
  this.message="";
}


}
