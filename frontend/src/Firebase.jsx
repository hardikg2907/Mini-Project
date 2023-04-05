// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfgt3yn97kdwPHgrYDePx-3PQFAE3iSCI",
  authDomain: "campus-sconnect-70e34.firebaseapp.com",
  projectId: "campus-connect-70e34",
  storageBucket: "campus-connect-70e34.appspot.com",
  messagingSenderId: "682656227172",
  appId: "1:682656227172:web:958c10caf02fc024d0a471"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export const signInWithGoogle = (e) => {
    e.preventDefault()
    signInWithPopup(auth, provider)
    .then((result)=>[
        console.log(result)
    ])
    .catch((error)=>{
        console.log(error)
    })
}