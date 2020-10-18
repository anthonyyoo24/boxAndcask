import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBVsB2VaylOvoFIITJCG8CJQ1kfzGnQDHs',
  authDomain: 'boxandcask-fe15d.firebaseapp.com',
  databaseURL: 'https://boxandcask-fe15d.firebaseio.com',
  projectId: 'boxandcask-fe15d',
  storageBucket: 'boxandcask-fe15d.appspot.com',
  messagingSenderId: '579911587558',
  appId: '1:579911587558:web:fb0b1b8aba6c60302f4d27',
};

firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.database();

export default firebase;
