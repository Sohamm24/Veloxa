import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCn2cAnRWDeVnYizCxrCLg5f1ZB-ExKais",
  authDomain: "veloxa-1f9a1.firebaseapp.com",
  projectId: "veloxa-1f9a1",
  storageBucket: "veloxa-1f9a1.firebasestorage.app",
  messagingSenderId: "730852093425",
  appId: "1:730852093425:web:a45ace09f45efc8d4fa850"
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error("Essential Firebase configuration is missing. Please check your .env file.");
  throw new Error("Firebase configuration error");
}


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export { auth };
