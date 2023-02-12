// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX24f-P7A7fChNLQBSNxdY25g6tZ_uKKw",
  authDomain: "voting-booth-1005f.firebaseapp.com",
  projectId: "voting-booth-1005f",
  storageBucket: "voting-booth-1005f.appspot.com",
  messagingSenderId: "864327155103",
  appId: "1:864327155103:web:ed3c007b75d5375ca111aa"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;