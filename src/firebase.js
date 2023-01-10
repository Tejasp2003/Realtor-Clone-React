
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'





const firebaseConfig = {
  apiKey: "AIzaSyAYogsazxzk0ut6lTTWUxkSKwWEv2SRhzE",
  authDomain: "realtor-react-clone-1420f.firebaseapp.com",
  projectId: "realtor-react-clone-1420f",
  storageBucket: "realtor-react-clone-1420f.appspot.com",
  messagingSenderId: "888228825836",
  appId: "1:888228825836:web:833fdf1b235e3cd20b33c9"
};


initializeApp(firebaseConfig);
export const db = getFirestore();