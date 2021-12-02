import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDgaDgzXATCAqeOwsorZ9aM_-B7zLdKBs",
  authDomain: "constructionmanagementsy-892e6.firebaseapp.com",
  projectId: "constructionmanagementsy-892e6",
  storageBucket: "constructionmanagementsy-892e6.appspot.com",
  messagingSenderId: "275012817234",
  appId: "1:275012817234:web:46e4a6c99ce3a6cf052a8b",
  measurementId: "G-K91VJ7WGJ6",
  };


firebase.initializeApp(firebaseConfig);


export default firebase;
