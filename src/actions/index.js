import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  CHANGE_QUANTITY,
} from './types';
import products from '../apis/products';
import history from '../history';

export const addToCart = (product, orderQuantity) => {
  return {
    type: ADD_TO_CART,
    payload: { ...product, orderQuantity },
  };
};

export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const changeQuantity = (product, orderQuantity) => {
  return {
    type: CHANGE_QUANTITY,
    payload: { ...product, orderQuantity },
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const changeAuth = (isSignedIn, userId = null) => {
  if (isSignedIn) {
    return {
      type: SIGN_IN,
      payload: userId,
    };
  } else {
    return {
      type: SIGN_OUT,
    };
  }
};

export const createProduct = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await products.post('/products', { ...formValues, userId });

  dispatch({ type: CREATE_PRODUCT, payload: response.data });

  history.push('/');
};

export const fetchProduct = (id) => async (dispatch) => {
  const response = await products.get(`/products/${id}`);

  dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const fetchProducts = () => async (dispatch) => {
  const response = await products.get('/products');

  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const deleteProduct = (id) => async (dispatch) => {
  await products.delete(`/products/${id}`);

  dispatch({ type: DELETE_PRODUCT, payload: id });

  history.push('/');
};

export const editProduct = (id, formValues) => async (dispatch) => {
  const response = await products.patch(`/products/${id}`, formValues);

  dispatch({ type: EDIT_PRODUCT, payload: response.data });

  history.push('/');
};
