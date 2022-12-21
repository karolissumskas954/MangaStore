import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
import { useState } from "react";


const firebaseConfig = {

    apiKey: "AIzaSyAdaKu_6IvFvhcvb6ApdBWST1VKcoeaPWk",

    authDomain: "fir-auth-d0253.firebaseapp.com",

    projectId: "fir-auth-d0253",

    storageBucket: "fir-auth-d0253.appspot.com",

    messagingSenderId: "805686066755",

    appId: "1:805686066755:web:ac7da591874a8a84641ef6",

    databaseURL: "https://fir-auth-d0253-default-rtdb.europe-west1.firebasedatabase.app"

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
const db = firebase.database();
const auth = firebase.auth()


//For jest authentication
let authenticated = false;
let emailVerified = false;

function signIn(email, password) {
    return new Promise((resolve, reject) => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
            authenticated = true;
            emailVerified = true;
            resolve(result);
        })
        .catch(reject)
    })
}

function signOut() {
    return new Promise(resolve => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                authenticated = false;
                resolve();
            })
    })
}

function isAuthenticated() {
    return authenticated && isEmailVerified();
}

function isEmailVerified() {
    if (auth.currentUser) {
        emailVerified = auth.currentUser.emailVerified;
    }
    return emailVerified
}

//Add data to firebase
let dataAded = false;

function writeDataToDatabase(id, title, price, author, publisher, language, pages, isbn, description, email, uri) {
    db
        .ref('manga/' + id)
        .set({
            title: title,
            price: price,
            author: author,
            publisher: publisher,
            language: language,
            pages: pages,
            isbn: isbn,
            description: description,
            postEmail: email,
            uri: uri
        }).then((index) => {
            dataAded = true;
        })
        .catch((error) => {
            dataAded = false;
        });
            dataAded = true;
}

function isDataAdded() {
    return dataAded;
}

//Delete data
let dataDeleted = false;

function deleteDataFromDatabase(id){
        db.ref("manga/" + id).remove()
        .then(() => dataDeleted = true)
        .catch(() => dataDeleted = false)
        dataDeleted = true;
}

function isDataDelted(){
    return dataDeleted
}

// Registration
let registerUser = false

function register(email,password){
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        registerUser = true;
    })
    .catch((error) => registerUser = false);
    registerUser = true;
}

function isUserRegistered(){
    return registerUser;
}


export {
    auth,
    db,
    isAuthenticated,
    signIn,
    signOut,
    writeDataToDatabase,
    isDataAdded,
    deleteDataFromDatabase,
    isDataDelted,
    register,
    isUserRegistered
};