import { auth, provider } from '../services/firebase';

export const signInWithGoogle = () => {
  return auth.signInWithPopup(provider);
};

export const signOutWithGoogle = () => {
  return auth.signOut();
};
