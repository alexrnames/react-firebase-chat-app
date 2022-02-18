// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZDpYIlf30AmBTIWJWX2U-FRgwB5RU37c",
  authDomain: "chat-app-alex-names.firebaseapp.com",
  projectId: "chat-app-alex-names",
  storageBucket: "chat-app-alex-names.appspot.com",
  messagingSenderId: "639632755047",
  appId: "1:639632755047:web:8c6a20ca64f4418fc847c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export default app;