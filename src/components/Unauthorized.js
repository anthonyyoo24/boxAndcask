import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../actions';

const Unauthorized = ({ location, history }) => {
  const currentUserId = useSelector((state) => state.auth.userId);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: '/' } };

  const previousUrlSplitArray = from.pathname.split('/');
  const productId = previousUrlSplitArray[previousUrlSplitArray.length - 1];

  const product = useSelector((state) => state.products[productId]);

  useEffect(() => {
    if (isSignedIn && (from.pathname.includes('edit') || from.pathname.includes('delete'))) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, from.pathname, productId, isSignedIn]);

  if (
    isSignedIn &&
    (from.pathname.includes('edit') || from.pathname.includes('delete')) &&
    product &&
    product.userId === currentUserId
  ) {
    setTimeout(() => {
      // History.replace redirects to the specified path except it replaces the current history entry
      // instead of pushing a new one like history.push does. We use history.replace because we
      // want the user to be able to click the 'back' button and not navigate to the unauthorized page
      // but to the page before it.

      history.replace(from);
    }, 100);

    return null;
  } else if (isSignedIn && from.pathname.includes('new')) {
    setTimeout(() => {
      history.replace(from);
    }, 100);

    return null;
  } else if (!isSignedIn) {
    return <div>You must first log in to access this page.</div>;
  } else {
    return <div>Only the user who posted this product can access this page.</div>;
  }
};

export default Unauthorized;
