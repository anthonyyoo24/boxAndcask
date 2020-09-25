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
    product.userId === currentUserId
  ) {
    setTimeout(() => {
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
