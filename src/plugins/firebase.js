import * as firebase from "firebase/app";
import "firebase/auth";
//import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyDFXgqvEPj3a6cPjfDAMAqRvENi1Rj7euA",
  authDomain: "firem-b3432.firebaseapp.com",
  databaseURL: "https://firem-b3432.firebaseio.com",
  projectId: "firem-b3432",
  storageBucket: "firem-b3432.appspot.com",
  messagingSenderId: "866789153670"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// utils
//const db = firebase.firestore();
const auth = firebase.auth();
/*
// collection references
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

*/
// export utils/refs
export { auth, firebase }; // db, usersCollection, postsCollection, commentsCollection, likesCollection
