// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyAdaKu_6IvFvhcvb6ApdBWST1VKcoeaPWk",

    authDomain: "fir-auth-d0253.firebaseapp.com",

    projectId: "fir-auth-d0253",

    storageBucket: "fir-auth-d0253.appspot.com",

    messagingSenderId: "805686066755",

    appId: "1:805686066755:web:ac7da591874a8a84641ef6"

};



// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth()

export { auth };