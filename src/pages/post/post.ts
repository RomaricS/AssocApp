import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { AnnoncesPage } from '../annonces/annonces';

import { User } from '../../providers/user';

import { FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage {
base64Image: any;
userProfile: FirebaseListObservable<any>;


title:any;
description : string;
eventDate: string;
eventHour: string;
author : string;
image : string;
type :  string;



  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User) {
    //load Current User Infos
    user.loadProfile();
    this.userProfile = user.userfromdb;

    this.title = "";
    this.description = "";
    this.eventDate = "";
    this.eventHour = "";
    this.image = "";
    this.type = "";
    
  }
//get image
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

  createNewPost(nom, prenom, mail){
    
    let author = prenom+ " "+nom;

    console.log(author);
    this.user.newPost(
      author,
      mail,
      this.title,
      this.description,
      this.eventDate,
      this.eventHour,
      this.image,
      this.type
    );
    this.navCtrl.setRoot(AnnoncesPage);
  }


}
