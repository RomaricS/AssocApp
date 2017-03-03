import firebase from 'firebase';
import {AngularFireModule} from 'angularfire2';

var firebaseConfig = {
    apiKey: "AIzaSyBn6l4S0xBJQhAUh3GQAu6B77kV39Qaku4",
    authDomain: "lshare-30444.firebaseapp.com",
    databaseURL: "https://lshare-30444.firebaseio.com",
    storageBucket: "lshare-30444.appspot.com",
    messagingSenderId: "617794774533"
};

let FbApp = firebase.initializeApp(firebaseConfig);
export const FBApp = FbApp.database(); //this doesnt have to be database only
