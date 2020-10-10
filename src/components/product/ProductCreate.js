import React from 'react';
import { useDispatch } from 'react-redux';
import ProductForm from './ProductForm';
import { createProduct } from '../../actions';

const ProductCreate = () => {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    // So that when a price below 1 is entered without the '0' before the decimal (ie. '.01' rather than '0.01'),
    // the '0' is automatically included. Also, we make sure that there are always two decimal places.
    const formattedPrice = parseFloat(formValues.price).toFixed(2);

    const newFormValues = { ...formValues, price: formattedPrice };

    dispatch(createProduct(newFormValues));
  };

  return (
    <div className="form-div">
      <p>Create a Product</p>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
};

export default ProductCreate;
