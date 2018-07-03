import firebase from 'firebase';
import flamelink from 'flamelink';

const config = {
    apiKey: "AIzaSyCAhRRKNN_vGNMfuvApc2sNlsfHQFWAxRo",
    authDomain: "juz-entertainment-8c282.firebaseapp.com",
    databaseURL: "https://juz-entertainment-8c282.firebaseio.com",
    projectId: "juz-entertainment-8c282",
    storageBucket: "juz-entertainment-8c282.appspot.com",
    messagingSenderId: "340489669375",
};

const fsSettings = {
    timestampsInSnapshots: true
};

export const fb = firebase.initializeApp(config);
export const fl = flamelink(config);
export const fs = firebase.firestore();
export const db = firebase.database();

fs.settings(fsSettings);
