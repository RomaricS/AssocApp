import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';
import { AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';


@Injectable()
export class User {
  currentUser:any;
  private authState: FirebaseAuthState;
  userfromdb: FirebaseListObservable<any>;
  loadedUsersList: any;
  usersRef:any;
  usersList:any;
  

  constructor(public http: Http,public af: AngularFire,public auth$: AngularFireAuth) {
      auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
       });

       //Récupérrer tableau de données sur user authenttifié
        this.af.auth.subscribe(user => {
          if(user) {
            // user logged in
            this.currentUser = user;
          }
          else {
            // user not logged in
            this.currentUser = {};
            console.log("User Out");
        }
         });

        //partie searchbar de Membres
        /*
          this.usersRef = this.af.database.list('/userProfile');

          
          let users = [];
          this.usersList.forEach( country => {
            users.push(country.val());
          });

          this.usersList = users;
          this.loadedUsersList = users;
          
*/
    }//constructor end

    initializeItems(): void {
      this.usersList = this.loadedUsersList;
    }

    get authenticated(): boolean {
    return this.authState !== null;
    }

    getUserInfo(){
      return this.currentUser;
    }

    getUserEmail(user:any): any {
      if(!user) {
        return {};
      }
      //console.log(user);
          let data = user.auth.providerData[0];
      return data.email
    }
    
    getFullUserInfos(email:any){
    //get the member whic email is passed as argument of node userProfile
    this.userfromdb = this.af.database.list('/userProfile', {
      query: {
        orderByChild: 'email',
        equalTo: email
      }
    });
    //console.log(email);
  }
  
  loadProfile(){
    //Récupérer l'email de l'utilisateur courent
    let email = this.getUserEmail(this.currentUser);

    //Passer l'email à la méthode-requete pour Récupérer tout le profil
    this.getFullUserInfos(email);
    //le profil est chargé dans la propriété userfromdb
  }

}
