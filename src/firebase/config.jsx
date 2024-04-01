
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCXucNeRTSLENJ4cRyjtNHmwiYy93KVpew",
  authDomain: "test-9fdaf.firebaseapp.com",
  databaseURL: "https://test-9fdaf-default-rtdb.firebaseio.com",
  projectId: "test-9fdaf",
  storageBucket: "test-9fdaf.appspot.com",
  messagingSenderId: "2889081671",
  appId: "1:2889081671:web:f4fd6c57d840157ae3a262",
  measurementId: "G-BS2NVF0JY9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);
const analytics = getAnalytics(app);

export {dbRef}



