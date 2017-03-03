import { AngularFireModule } from 'angularfire2';

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AnnoncesPage } from '../pages/annonces/annonces';
import { ChatPage } from '../pages/chat/chat';
import { MembresPage } from '../pages/membres/membres';
import { MembreDetailPage } from '../pages/membre-detail/membre-detail';
import { ProfilPage } from '../pages/profil/profil';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

import { AuthData } from '../providers/auth-data';
import { User } from '../providers/user';

import { MembresService } from '../services/membres/membres.services';


export const firebaseConfig = {
    apiKey: "AIzaSyBn6l4S0xBJQhAUh3GQAu6B77kV39Qaku4",
    authDomain: "lshare-30444.firebaseapp.com",
    databaseURL: "https://lshare-30444.firebaseio.com",
    storageBucket: "lshare-30444.appspot.com",
    messagingSenderId: "617794774533"
};

@NgModule({
  
  declarations: [
    MyApp,
    HomePage,
    AnnoncesPage,
    ChatPage,
    MembresPage,
    MembreDetailPage,
    ProfilPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AnnoncesPage,
    ChatPage,
    MembresPage,
    MembreDetailPage,
    ProfilPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage 
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthData, MembresService, User]
})
export class AppModule {}
