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

    getItems(searchbar) {
    // Reset items back to all of the items
    this.user.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.user.usersList = this.user.usersList.filter((v) => {
      if(v.nom && q) {
        if (v.nom.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
}
