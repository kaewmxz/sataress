import firebase from 'firebase/compat/app';
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB4Jdub6rsHGvRgbDWE54jsYlL1RZrt4Ms",
    authDomain: "senior-project-105f0.firebaseapp.com",
    projectId: "senior-project-105f0",
    storageBucket: "senior-project-105f0.appspot.com",
    messagingSenderId: "135782512554",
    appId: "1:135782512554:web:3afd66dab4be67d4ca9dd3",
    measurementId: "G-2X4JEP8GJ1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
const provider = new GoogleAuthProvider(); 
export const signIn = () => signInWithRedirect(auth, provider);

export default firebase;
