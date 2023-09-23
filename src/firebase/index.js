import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { auth } from './firebase';

export const SignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    return result?.user 
  }).catch((error) => console.log(error));
};

export const logOut = () => {
  signOut(auth);
};
