import '../sass/components.scss';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAuth } from '../actions';

const GoogleAuth = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const auth = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: '1053549322562-8susv68oa8tafnn0pq94m6n3l5cl915h.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();

          auth.current.isSignedIn.get()
            ? dispatch(changeAuth(true, auth.current.currentUser.get().getId()))
            : dispatch(changeAuth(false));

          auth.current.isSignedIn.listen((isSignedIn) =>
            dispatch(changeAuth(isSignedIn, auth.current.currentUser.get().getId()))
          );
        });
    });
  }, [dispatch]);

  const trySignIn = () => {
    auth.current.signIn();
  };

  const trySignOut = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button
          onClick={trySignOut}
          className="ui red google button"
          style={{ marginRight: '24px' }}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={trySignIn} className="ui red google button" style={{ marginRight: '24px' }}>
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
