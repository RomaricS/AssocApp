//Modules
import { AngularFireModule } from 'angularfire2';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

//pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AnnoncesPage } from '../pages/annonces/annonces';
import { MembresPage } from '../pages/membres/membres';
import { MembresService } from '../services/membres/membres.services';
import { EditUserPage } from '../pages/edit-user/edit-user';
import { MembreDetailPage } from '../pages/membre-detail/membre-detail';
import { ProfilPage } from '../pages/profil/profil';
import { SignupPage } from '../pages/signup/signup';
import { ConvoPage } from '../pages/convo/convo';
import { MessagePage } from '../pages/message/message';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AnnonceDetailPage } from '../pages/annonce-detail/annonce-detail';
import { MypostPage } from '../pages/mypost/mypost';
import { PostPage } from '../pages/post/post';

//providers
import { AuthService } from '../providers/auth.services';
import { AuthData } from '../providers/auth-data';
import { User } from '../providers/user';

export const firebaseConfig = {
    apiKey: "AIzaSyBn6l4S0xBJQhAUh3GQAu6B77kV39Qaku4",
    authDomain: "lshare-30444.firebaseapp.com",
    databaseURL: "https://lshare-30444.firebaseio.com",
    storageBucket: "lshare-30444.appspot.com",
    messagingSenderId: "617794774533"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b7dcdedc'
  },
  'push': {
    'sender_id': '617794774533',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  
  declarations: [
    MyApp,
    HomePage,
    AnnoncesPage,
    MembresPage,
    MembreDetailPage,
    ProfilPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    EditUserPage,
    ConvoPage,
    MessagePage,
    AnnonceDetailPage,
    MypostPage,
    PostPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AnnoncesPage,
    MembresPage,
    MembreDetailPage,
    ProfilPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    EditUserPage,
    ConvoPage,
    MessagePage,
    AnnonceDetailPage,
    MypostPage,
    PostPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthData,AuthService, MembresService, User]
})
export class AppModule {}
