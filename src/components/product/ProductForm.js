import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FileInput from '../FileInput';

const renderError = ({ error, touched }) => {
  if (touched && error) {
    return <div className="form__error ui error message">{error}</div>;
  }
};

const renderInput = ({ input, label, meta, type, minlength, maxlength }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
  const fieldInput =
    type === 'textarea' ? (
      <textarea
        {...input}
        className="form__input"
        rows="5"
        minLength={minlength}
        maxLength={maxlength}
      />
    ) : (
      <input
        {...input}
        className="form__input"
        autoComplete="off"
        type={type}
        minLength={minlength ? minlength : ''}
        maxLength={maxlength ? maxlength : ''}
      />
    );

  return (
    <div className={className}>
      <label className="form__label">{label}</label>
      {fieldInput}
      {renderError(meta)}
    </div>
  );
};

const ProductForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)} className="ui form error">
      <Field name="image" component={FileInput} label="Image" />
      <Field name="name" component={renderInput} label="Name" minlength="1" maxlength="25" />
      <Field name="price" component={renderInput} label="Price" type="number" />
      <Field name="stock" component={renderInput} label="Stock Count" type="number" />
      <Field
        name="description"
        component={renderInput}
        label="Description"
        type="textarea"
        minlength="1"
        maxlength="500"
      />
      <button className="primary button-2of4">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.name) errors.name = 'Please enter the name of the product.';
  if (!formValues.price) errors.price = 'Please enter the price of the product.';
  if (parseFloat(formValues.price) < 0.01)
    errors.price = 'Please enter a price greater than 1 cent.';
  if (!formValues.stock) errors.stock = 'Please enter the amount of stock of the product.';
  if (parseFloat(formValues.stock) < 1) errors.stock = 'Please enter an amount greater than 1.';
  if (!Number.isInteger(parseFloat(formValues.stock))) errors.stock = 'Please enter only integers';
  if (!formValues.description) errors.description = 'Please enter a description for the product.';

  return errors;
};

// 'reduxForm' function basically same functionality as the connect function from 'react-redux'.
// Name of the form should describe the purpose of the form. It will show up within the 'form' property
// of the redux state object with a key of 'productForm'
export default reduxForm({ form: 'productForm', validate })(ProductForm);
