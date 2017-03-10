import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers/user';
import { ConvoPage } from '../convo/convo';

import { FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the MembreDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-membre-detail',
  templateUrl: 'membre-detail.html'
})
export class MembreDetailPage {
    nom: string;
    prenom: string;
    mail: string;
    chambre: number;
    mymail:string;
    currentU: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public us:User) {
    this.nom = this.navParams.get('nom');
    this.prenom = this.navParams.get('prenom');
    this.mail = this.navParams.get('email');
    this.chambre = this.navParams.get('chambre');
    this.mymail = us.getEmail();
    us.loadProfile();
    this.currentU = us.userfromdb;
  }

  createMessage(senderName){
    //console.log("Je crée la convo",this.mymail, this.mail);
    this.us.createConvo(this.mail, this.mymail, this.prenom, senderName);
    this.navCtrl.setRoot(ConvoPage);
  }

    
}
