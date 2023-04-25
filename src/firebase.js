// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqosDMICCPEeGfHTPutdbq2PquynI2tQE",
  authDomain: "voting-8656a.firebaseapp.com",
  projectId: "voting-8656a",
  storageBucket: "voting-8656a.appspot.com",
  messagingSenderId: "812249648310",
  appId: "1:812249648310:web:b401b5be4ed44a80d56a17"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore();

export default db;