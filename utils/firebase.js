import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyDI8uyb11yoJYe3stmtlItIvADlyhC7ni0",
    authDomain: "restaurants-23b89.firebaseapp.com",
    projectId: "restaurants-23b89",
    storageBucket: "restaurants-23b89.appspot.com",
    messagingSenderId: "773496541193",
    appId: "1:773496541193:web:bb9acc2fcf47fee8f868d8"
  };
  
  
 export const firebaseApp =  firebase.initializeApp(firebaseConfig);

  