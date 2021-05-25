import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB4PvmoEEUHnDuMre0D7VyNH4I3KqPkh34",
  authDomain: "restaurants-3552d.firebaseapp.com",
  projectId: "restaurants-3552d",
  storageBucket: "restaurants-3552d.appspot.com",
  messagingSenderId: "22338429694",
  appId: "1:22338429694:web:5521a81eab878ded4c7baf"
}
  
  
 export const firebaseApp =  firebase.initializeApp(firebaseConfig);

  