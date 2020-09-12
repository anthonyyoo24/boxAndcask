import React from 'react';
import { useDispatch } from 'react-redux';
import ProductForm from './ProductForm';
import { createProduct } from '../../actions';

const ProductCreate = () => {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);
    dispatch(createProduct(formValues));
  };

  return (
    <div>
      <h3>Create a Product</h3>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
};

export default ProductCreate;
