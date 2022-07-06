import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {} from "firebase/database";
import {} from "firebase/app-check";
import {} from "firebase/functions";
import {} from "firebase/messaging";
import {} from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";

// import {seedDatabase } from '../seed'

const firebaseConfig = {
  apiKey: "AIzaSyAHXfwlaOKfaI3qeZoW-IckYt07FxMeGnU",
  authDomain: "instagram-web-7bcd6.firebaseapp.com",
  projectId: "instagram-web-7bcd6",
  storageBucket: "instagram-web-7bcd6.appspot.com",
  messagingSenderId: "211300442866",
  appId: "1:211300442866:web:e21e3a5544e04124d3266b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
