// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDocs, getFirestore, query,  where } from "firebase/firestore";
// Your web app's Firebase configuration
//process.env.REACT_APP_FIREBASE_KEY
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "dts-final-project-d650a.firebaseapp.com",
  projectId: "dts-final-project-d650a",
  storageBucket: "dts-final-project-d650a.appspot.com",
  messagingSenderId: "279291700585",
  appId: "1:279291700585:web:300d40c741eff8e701c9f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Fungsi
const mapAuthCodeToMessage = (authCode) => {
  switch (authCode) {
    case "auth/invalid-password":
      return alert("Password provided is not corrected");

    case "auth/invalid-email":
      return alert("Email provided is invalid");

    case "auth/weak-password":
      return alert("Password should be at least 6 characters");

    case "auth/email-already-exists":
      return alert("Email already exist");

    case "auth/internal-error":
      return alert("Server error, please try again");

    case "auth/user-not-found":
      return alert("User not found");

    case "auth/wrong-password":
      return alert("Wrong password");

    default:
      return "";
  }
};

const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "favorites"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length === 0){
        await addDoc(
        doc(db, "favorites", auth.currentUser.uid),
        {
          uid: auth.currentUser.uid,
          game: [],
          email: auth.currentUser.email,
        },
        { merge: true }
      );
      }
    
  } catch (error) {
    console.log(error);
    mapAuthCodeToMessage(error.code);
  }
};

const registerDenganEmailDanPassword = async (email, password) => {
  try {
    const userYangDidapatakan = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userYangDidapatakan.user.uid);
  } catch (err) {
    console.log(err);
    console.log("Error code auth", err.code);
    console.log("Error msg auth", err.message);
    mapAuthCodeToMessage(err.code);
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
    mapAuthCodeToMessage(err.code);
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert(`Email send to ${email}`);
  } catch (err) {
    console.log(err);
    console.log("Error code auth", err.code);
    console.log("Error msg auth", err.message);
    mapAuthCodeToMessage(err.code);
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

export { auth, db, registerDenganEmailDanPassword, loginDenganEmailDanPassword, resetPassword, keluarDariAplikasi, googleSignIn };
