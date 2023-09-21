import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAuU6hd3jCMn0NH99G99_h6y6ITWEItbAg",
    authDomain: "main-project-c5d62.firebaseapp.com",
    projectId: "main-project-c5d62",
    storageBucket: "main-project-c5d62.appspot.com",
    messagingSenderId: "865304790804",
    appId: "1:865304790804:web:459a4ae98517dae82de401",
    measurementId: "G-3MWYFBL46V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)