import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../actions';

const ProductList = () => {
  const products = useSelector((state) => Object.values(state.products));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return <div>ProductList</div>;
};

export default ProductList;
