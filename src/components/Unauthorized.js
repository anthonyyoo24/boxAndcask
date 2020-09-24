import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../actions';

const Unauthorized = ({ history, location }) => {
  const currentUserId = useSelector((state) => state.auth.userId);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: '/' } };

  const urlSplitArray = location.state.from.pathname.split('/');
  const productId = urlSplitArray[urlSplitArray.length - 1];
  const product = useSelector((state) => state.products[productId]);

  useEffect(() => {
    if (isSignedIn && (from.pathname.includes('edit') || from.pathname.includes('delete'))) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, from.pathname, productId, isSignedIn]);

  if (isSignedIn && from.pathname.includes('edit') && product.userId !== currentUserId) {
    return <div>Only the user who created this product may edit it.</div>;
  } else if (isSignedIn && from.pathname.includes('delete') && product.userId !== currentUserId) {
    return <div>Only the user who created this product may delete it.</div>;
  } else if (isSignedIn) {
    history.replace(from);
  } else {
    return <div>You must first log in to access this page.</div>;
  }

  // else if (
  //   isSignedIn &&
  //   (from.pathname.includes('edit') || from.pathname.includes('delete')) &&
  //   product.userId === currentUserId
  // ) {
  //   history.replace(from);
  // } else if (isSignedIn && from.pathname.includes('new')) {
  //   history.replace(from);
  // }
};

export default Unauthorized;
