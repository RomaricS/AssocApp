import { Injectable } from '@angular/core';
import { Membres } from './membres';
import { AuthData } from '../../providers/auth-data';
import { FirebaseListObservable } from 'angularfire2';


@Injectable()
export class MembresService {
    constructor (public authData: AuthData){}
    mlist: FirebaseListObservable<any>;

    getMembres(){
       
       
      this.mlist = this.authData.getAllMembers();
      console.log(this.mlist);
      return this.mlist;
    } // stub
}