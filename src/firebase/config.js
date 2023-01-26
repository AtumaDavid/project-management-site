import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4xPIhuyrWCfUeR-0V6m8fv_f1IrciBTg",
  authDomain: "projectmanagementsite-205e8.firebaseapp.com",
  projectId: "projectmanagementsite-205e8",
  storageBucket: "projectmanagementsite-205e8.appspot.com",
  messagingSenderId: "531996411313",
  appId: "1:531996411313:web:57e4dd573007da504d6990",
};

//initialize firebase
// firebase.default.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

//initialize service
const projectFirestore = firebase.firestore();
const projectAuthentication = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuthentication, projectStorage, timestamp };
