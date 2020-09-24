import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  // when our app first boots up we are not signed in so we are immediately redirected to the unauthorized
  // component.

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSignedIn) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={{ pathname: '/unauthorized', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
