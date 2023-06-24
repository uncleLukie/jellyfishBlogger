import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signOut, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword };
