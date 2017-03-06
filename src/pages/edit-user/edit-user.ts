import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Camera } from 'ionic-native';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
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

public editForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  base64Image:string = "";
  monProfil: FirebaseListObservable<any>;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public user: User) {
    user.loadProfile();
    this.monProfil = user.userfromdb;

    this.editForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      nom :[''],
      prenom: [''],
      chambre: [''],
      prof: [''],
      dateEntree: [''],
      base64Image: ['']
    })
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

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
  
  elementChanged(input){
    //console.log(input);
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  editUser(){
    this.submitAttempt = true;

    if (!this.editForm.valid){
      //console.log(this.editForm.value);
    } else {
      this.authData.editUser(this.editForm.value.email,
                              this.editForm.value.password,
                              this.editForm.value.nom,
                              this.editForm.value.prenom,
                              this.editForm.value.chambre,
                              this.editForm.value.dateEntree,
                              this.editForm.value.prof,
                              this.base64Image).then(() => {
        this.nav.setRoot(ProfilPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let alert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
