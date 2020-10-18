import './GoogleAuth.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuth } from '../actions';
import { auth } from '../services/firebase';
import { signInWithGoogle, signOutWithGoogle } from '../helpers/auth';

const GoogleAuth = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(changeAuth(true, user.uid));
      } else {
        dispatch(changeAuth(false));
      }
    });
  }, [dispatch]);

  const trySignIn = async () => {
    await signInWithGoogle();
  };

  const trySignOut = async () => {
    await signOutWithGoogle();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={trySignOut} className="google-auth ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={trySignIn} className="google-auth ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
