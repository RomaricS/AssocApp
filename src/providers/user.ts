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
  convosList: FirebaseListObservable<any>;
  loadedUsersList: any;
  usersRef:any;
  usersList:any;
  messages: FirebaseListObservable<any>;
  convoMessages: FirebaseListObservable<any>;
  

  constructor(public http: Http,public af: AngularFire,public auth$: AngularFireAuth) {
      auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
       });

       //Récupérrer tableau de données sur user authenttifié
        af.auth.subscribe(user => {
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
    //get the member which email is passed as argument of node userProfile
    this.userfromdb = this.af.database.list('/userProfile', {
      query: {
        orderByChild: 'email',
        equalTo: email
      }
    });
    //console.log(email);
  }
  getEmail(){
    return this.getUserEmail(this.currentUser);
  }
  loadProfile(){
    //Récupérer l'email de l'utilisateur courant
    let email = this.getUserEmail(this.currentUser);

    //Passer l'email à la méthode-requete pour Récupérer tout le profil
    this.getFullUserInfos(email);
    //le profil est chargé dans la propriété userfromdb
  }

  getMessages(){
    return this.af.database.list('/Messages');
  }

  sendMessage(mess: string,
              nom:string,
              pren:string,
              mail:string,
              id:string){
    this.messages = this.af.database.list('/Messages');    
    this.messages.push({
          message: mess,
          nom: nom,
          prenom: pren,
          sender: mail,
          idConvo: id,
          postedAt: new Date().toLocaleTimeString()
      });
    }



      getFullUserConvos(){
    //get all convos
    return this.convosList = this.af.database.list('/Conversations');
    //console.log(email);
       /*return this.convosList = this.af.database.list('/Conversations', {
      query: {
        orderByChild: 'id',
        equalTo: "a@a.com"
      }
    });*/
  
  }

  createConvo(receiver:string, sender:string, Rname:string, Sname:string){
    //generate id
    let id = sender+receiver;
    //console.log(id);
    this.convosList.push({
          id: id,
          rMail: receiver,
          sMail: sender,
          sname: Sname,
          rname: Rname,
          time: new Date().toLocaleTimeString()
      });
  }

  getAllConvoMessages(id: string){
    //récupere tous les messages de la conversation dont l'id est passé en argumet
    return this.convoMessages = this.af.database.list('/Messages', {
      query: {
        orderByChild: 'idConvo',
        equalTo: id
      }
    });
  }


}
