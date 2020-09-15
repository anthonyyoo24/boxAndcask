import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FileInput from '../FileInput';

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui error message">
        <div className="header">{error}</div>
      </div>
    );
  }
};

const renderInput = ({ input, label, meta, type }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

  return (
    <div className={className}>
      <label>{label}</label>
      <input {...input} autoComplete="off" type={type} />
      {renderError(meta)}
    </div>
  );
};

const ProductForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="ui form error">
      <Field name="name" component={renderInput} label="Name" />
      <Field name="category" component={renderInput} label="Category" />
      <Field name="image" component={FileInput} label="Image" />
      <Field name="price" component={renderInput} label="Price" type="number" />
      <Field name="stock" component={renderInput} label="Stock Count" type="number" />
      <Field name="description" component={renderInput} label="Description" />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) errors.name = 'Please enter the name of the product.';
  if (!formValues.category) errors.category = 'Please enter the category of the product.';
  if (!formValues.price) errors.price = 'Please enter the price of the product.';
  if (!formValues.stock) errors.stock = 'Please enter the amount of stock of the product.';
  if (!formValues.description) errors.description = 'Please enter a description for the product.';

  return errors;
};

export default reduxForm({ form: 'productForm', validate })(ProductForm);
