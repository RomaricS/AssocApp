import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AnnoncesPage } from '../pages/annonces/annonces';
import { ChatPage } from '../pages/chat/chat';
import { MembresPage } from '../pages/membres/membres';
import { MembreDetailPage } from '../pages/membre-detail/membre-detail';
import { ProfilPage } from '../pages/profil/profil';
import { SignupPage } from '../pages/signup/signup';
import { User } from '../providers/user';
import { ConvoPage } from '../pages/convo/convo';


import { AuthData } from '../providers/auth-data';
import { AngularFire, AuthProviders } from 'angularfire2';


//finir avec l'utilisateur connecté puis passer au profil

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //page d'accueil
  rootPage:any;
  pages: Array<{title: string, component: any}>;
  loading: any;
  currentUser:any;
  checkDec:any = null;


  constructor(public platform: Platform, public authD:AuthData, 
    public loadingCtrl: LoadingController,public af: AngularFire) {
    this.initializeApp();



    //gerer la page à afficher en fonction du currentUser
      this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.currentUser = user;
        this.rootPage = ProfilPage;
        //Pour cacher le bouton deconnecter
        this.checkDec = "Ok";

        this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Annonces', component: AnnoncesPage },
        //{ title: 'Chat', component: ChatPage },
        { title: 'Membres', component: MembresPage },
        { title: 'Conversations', component: ConvoPage },
        { title: 'Profil', component: ProfilPage },
        
        //{ title: 'Login', component: LoginPage } <= pas necessaire dans le menu
      ];
      }
      else {
        // user not logged in
        this.checkDec = null;
        this.currentUser = {};
        this.rootPage = LoginPage;
        console.log("User Out");
                this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Connexion', component: LoginPage },
      ];
    }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  logOut(){
    //deconnecte puis affiche la page de connexion
    this.authD.logoutUser();
    this.nav.setRoot(LoginPage);
  }
}
