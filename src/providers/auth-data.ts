import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {FirebaseListObservable, AngularFire } from 'angularfire2';


@Injectable()
export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;
  public currentUser: any;
  users: FirebaseListObservable<any>;
  

  constructor( public af : AngularFire) {
    this.fireAuth = firebase.auth(); // We are creating an auth reference.
    // This declares a database reference for the userProfile/ node.
    this.userProfile = firebase.database().ref('/userProfile');

    //get all members of node userProfile
    this.users = this.af.database.list('/userProfile');
    
  }
  getCurrentUser(){
    return this.fireAuth.currentUser.displayName;
  }
  /*
  Get membersList
   */
  getAllMembers(){
    
    return this.users;
  }

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   * @param  {number} chambre [User's room number]
   * @param  {string} prenom [User's first name]
   * @param  {string} nom [User's family name]
   * @param  {string} prof [User's job description]
   * @param  {string} image [User's pic]
   * 
   * Création d'un compte d'auth puis inscription dans la partie database//@para  { image [User's pic]
   */
  signupUser( email: string,
              password: string,
              nom: string,
              prenom: string,
              chambre: number,
              dateEntree: string,
              prof: string,
              pic:string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
                      firebase.auth().onAuthStateChanged(function(user) {
      user.sendEmailVerification(); 
    });
      this.userProfile.child(newUser.uid).set({
          email: email,
          password: password,
          nom: nom,
          prenom: prenom,
          chambre: chambre,
          arrivee: dateEntree,
          prof: prof,
          image: pic
      });
    });
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser(): any {
    return this.fireAuth.signOut();
  }

}
