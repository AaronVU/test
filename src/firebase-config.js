import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoz0pqftbT_ckQlNBX5KsQfjF8Cw_z0C8",
  authDomain: "mytestapp-a4832.firebaseapp.com",
  projectId: "mytestapp-a4832",
  storageBucket: "mytestapp-a4832.appspot.com",
  messagingSenderId: "286569334652",
  appId: "1:286569334652:web:11b56deb186a9776e506f9",
  measurementId: "G-JPBTS27LNK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);