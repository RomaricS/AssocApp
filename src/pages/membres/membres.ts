import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MembresService } from '../../services/membres/membres.services';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { MembreDetailPage } from '../membre-detail/membre-detail';
import firebase from 'firebase';
import { User } from '../../providers/user';

@Component({
  selector: 'page-membres',
  templateUrl: 'membres.html',
  providers: [MembresService]
})
export class MembresPage {
  memberslist: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, private MembresService: MembresService, public af:AngularFire, public user: User) {}

    getMembers() {
    //this.memberslist = this.MembresService.getMembres();
    this.memberslist = this.af.database.list('/userProfile');
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getDetails(nom: string, prenom: string, mail: string, chambre: number): void{
    this.navCtrl.push(MembreDetailPage, {
    nom: nom,
    prenom: prenom,
    email: mail,
    chambre: chambre
});
  }
}
