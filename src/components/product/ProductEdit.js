import _ from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './ProductForm';
import { editProduct, fetchProduct } from '../../actions';

const ProductEdit = (props) => {
  const product = useSelector((state) => state.products[props.match.params.id]);
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);

    // So that when a price below 1 is entered without the '0' before the decimal (ie. '.01' rather than '0.01'),
    // the '0' is automatically included. Also, we make sure that there are always two decimal places.
    const formattedPrice = parseFloat(formValues.price).toFixed(2);

    const newFormValues = { ...formValues, price: formattedPrice };

    dispatch(editProduct(props.match.params.id, newFormValues));
  };

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="ui segment" style={{ maxWidth: '40vw', margin: 'auto' }}>
      <h3 className="ui dividing header">Edit Product</h3>
      <ProductForm
        initialValues={_.pick(product, 'name', 'image', 'price', 'stock', 'description')}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ProductEdit;
