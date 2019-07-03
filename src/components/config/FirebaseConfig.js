import "firebase/firestore";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBkD5ntKZVjDeUsEQfEiY1-oiKCc5YbwDk",
  authDomain: "undressgame.firebaseapp.com",
  databaseURL: "https://undressgame.firebaseio.com",
  projectId: "undressgame",
  storageBucket: "",
  messagingSenderId: "808798313279",
  appId: "1:808798313279:web:e69cddac6fb0dc60"
};
firebase.initializeApp(firebaseConfig);
export default firebase;
