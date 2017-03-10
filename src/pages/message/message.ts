import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  idConvo: string;
  allMessages: FirebaseListObservable<any>;
  mesInfos: FirebaseListObservable<any>;
  message:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public us: User) {
    //récupérer les arguments envoyés par la page Convo
    this.idConvo = this.navParams.get('id');
    //obtenir les infos de l'user courant
    us.loadProfile();
    this.mesInfos = us.userfromdb;
    //récupérer tous les messages de la conversation don' l'id est recu en param
    this.allMessages = this.us.getAllConvoMessages(this.idConvo);
  }

  sendMessage(nom:string, pren:string, mail:string){
  //console.log(this.message);
  this.us.sendMessage(this.message, nom, pren, mail, this.idConvo);
  this.message="";
}


}
