// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcmpdAtxzYXke9Xmteb1lKAMAWQs3Uz4g",
  authDomain: "dts-final-project-d650a.firebaseapp.com",
  projectId: "dts-final-project-d650a",
  storageBucket: "dts-final-project-d650a.appspot.com",
  messagingSenderId: "279291700585",
  appId: "1:279291700585:web:300d40c741eff8e701c9f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Fungsi
const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const registerDenganEmailDanPassword = async (email, password) => {
  try {
    const userYangDidapatakan = await createUserWithEmailAndPassword(auth, email, password);

    console.log(userYangDidapatakan.user);
  } catch (err) {
    console.log(err);
    console.log("Error code auth", err.code);
    console.log("Error msg auth", err.message);
  }
};

const loginDenganEmailDanPassword = async (email, password) => {
  try {
    const userYangLogin = await signInWithEmailAndPassword(auth, email, password);
    console.log("user yang login adalah", userYangLogin.user);
  } catch (err) {
    console.log(err);
    console.log("Error code auth", err.code);
    console.log("Error msg auth", err.message);
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log(err);
    console.log("Error code auth", err.code);
    console.log("Error msg auth", err.message);
  }
};

const keluarDariAplikasi = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
    console.log("Error code auth", err.code);
    console.log("Error msg auth", err.message);
  }
};

export { auth, registerDenganEmailDanPassword, loginDenganEmailDanPassword, resetPassword, keluarDariAplikasi, googleSignIn };
