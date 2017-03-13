import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import { AnnonceDetailPage } from '../annonce-detail/annonce-detail';
import { MypostPage } from '../mypost/mypost';
import { PostPage } from '../post/post';
import { User } from '../../providers/user';

@Component({
  selector: 'page-annonces',
  templateUrl: 'annonces.html'
})
export class AnnoncesPage {
  postslist: FirebaseListObservable<any>;


  constructor(public navCtrl: NavController, public user: User) {
    this.postslist = this.user.getPosts();
    //console.log(this.postslist);
  }


  getPostDetails(nom: string, prenom: string, mail: string, chambre: number): void{
    this.navCtrl.push(AnnonceDetailPage, {
    nom: nom,
    prenom: prenom,
    email: mail,
    chambre: chambre
});
  }

  create(){
    this.navCtrl.setRoot(PostPage);
  }

}
