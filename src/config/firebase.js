import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5doUe9FwwWwADf9wMgZaW6XTuovVf3ZY",
  authDomain: "weview-1d77d.firebaseapp.com",
  databaseURL: "https://weview-1d77d.firebaseio.com",
  projectId: "weview-1d77d",
  storageBucket: "weview-1d77d.appspot.com",
  messagingSenderId: "186292065116",
  appId: "1:186292065116:web:9e0b6808b6de55b4222799",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
