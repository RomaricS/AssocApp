import { NavController,NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
;
import { AuthData } from '../../providers/auth-data';
import { ProfilPage } from '../profil/profil';
import { User } from '../../providers/user';
import { FirebaseListObservable } from 'angularfire2';

/*
reste à récupérer la clé de l'utilisateur courant
*/
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html'
})
export class EditUserPage {
  userInfos = {
    key: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    image : "",
    prof: ""
  };

  base64Image:string = "";
  monProfil: FirebaseListObservable<any>;


  constructor(public nav: NavController, public authData: AuthData, public user: User, public params: NavParams) {
    user.loadProfile();
    this.monProfil = user.userfromdb;

    this.userInfos.nom = params.get('nom');
    this.userInfos.prenom = params.get('pren');
    this.userInfos.email = params.get('mail');
    this.userInfos.prof = params.get('prof');
    this.userInfos.password = params.get('pass');
    this.userInfos.key = params.get('key');
    this.userInfos.image = params.get('img');

  }

   accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }


  editUser(nom,
          prenom,
          mail,
          pass,
          prof){
            console.log(prof);
    this.monProfil.update(this.userInfos.key, {
      nom: nom,
      prenom: prenom,
      email: mail,
      password: pass,
      prof: prof,
      image: this.base64Image
    }).then( newInfos => {
      this.nav.pop();
    }
    )
  };

}
