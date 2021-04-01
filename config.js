import firebase from 'firebase'
require("@firebase/firestore")
var firebaseConfig = {
    apiKey: "AIzaSyDLpO6818NeOVmPodhOo_5bwKdc5muOstM",
    authDomain: "mind-overview-e11e0.firebaseapp.com",
    projectId: "mind-overview-e11e0",
    storageBucket: "mind-overview-e11e0.appspot.com",
    messagingSenderId: "294995786239",
    appId: "1:294995786239:web:d1a785c71f80baab138fca",
    measurementId: "G-7ZEYKNK02P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

export default firebase.firestore()