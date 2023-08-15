
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAcH14kDrFDEr5kQMn0sxICYz7Aepvp1GM",
  authDomain: "feed-7900a.firebaseapp.com",
  databaseURL: "https://feed-7900a-default-rtdb.firebaseio.com",
  projectId: "feed-7900a",
  storageBucket: "feed-7900a.appspot.com",
  messagingSenderId: "548302889464",
  appId: "1:548302889464:web:94c1e182d2a8a045b1b60d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
