import React from 'react';
import { useDispatch } from 'react-redux';
import ProductForm from './ProductForm';
import { createProduct } from '../../actions';

const ProductCreate = () => {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);

    // So that when a price below 1 is entered without the '0' before the decimal (ie. '.01' rather than '0.01'),
    // the '0' is automatically included. Also, we make sure that there are always two decimal places.
    const formattedPrice = parseFloat(formValues.price).toFixed(2);

    const newFormValues = { ...formValues, price: formattedPrice };

    dispatch(createProduct(newFormValues));
  };

  return (
    <div className="ui segment" style={{ maxWidth: '40vw', margin: 'auto', marginBottom: '20px' }}>
      <h3 className="ui dividing header">Create a Product</h3>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
};

export default ProductCreate;
