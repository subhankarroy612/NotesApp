import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCIQcrMTYQVFfcGxrBOJPDpHwyhh5FDuK4",
    authDomain: "notesapp-911c7.firebaseapp.com",
    projectId: "notesapp-911c7",
    storageBucket: "notesapp-911c7.appspot.com",
    messagingSenderId: "325105906052",
    appId: "1:325105906052:web:e8c7b77d173a8bd6d26dd1",
    measurementId: "G-9JTL4F4GKS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

