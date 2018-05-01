import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDF2qFh5ETFBiV9qG_x4xk8jTbkqTEbzuU",
    authDomain: "simple-note-dc53e.firebaseapp.com",
    databaseURL: "https://simple-note-dc53e.firebaseio.com",
    projectId: "simple-note-dc53e",
    storageBucket: "simple-note-dc53e.appspot.com",
    messagingSenderId: "237758247003"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
