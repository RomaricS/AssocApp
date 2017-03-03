import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nom = this.navParams.get('nom');
    this.prenom = this.navParams.get('prenom');
    this.mail = this.navParams.get('email');
    this.chambre = this.navParams.get('chambre');

  }

    
}
