// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAdaKu_6IvFvhcvb6ApdBWST1VKcoeaPWk",

    authDomain: "fir-auth-d0253.firebaseapp.com",

    projectId: "fir-auth-d0253",

    storageBucket: "fir-auth-d0253.appspot.com",

    messagingSenderId: "805686066755",

    appId: "1:805686066755:web:ac7da591874a8a84641ef6",

    databaseURL: "https://fir-auth-d0253-default-rtdb.europe-west1.firebasedatabase.app"

};



// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

// const db = firebase.firestore();
//const db = firebase.firestore();
const db = firebase.database();

const auth = firebase.auth()

export { auth, db };