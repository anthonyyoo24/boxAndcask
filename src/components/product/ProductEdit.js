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
    dispatch(editProduct(props.match.params.id, formValues));
  };

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h3>Edit Product</h3>
      <ProductForm
        initialValues={_.pick(
          product,
          'name',
          'category',
          'image',
          'price',
          'stock',
          'sku',
          'description'
        )}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ProductEdit;
