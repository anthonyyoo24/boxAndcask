import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
} from './types';
import products from '../apis/products';

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
};

export const fetchProduct = (id) => async (dispatch) => {
  const response = await products.get(`/products/${id}`);

  dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const fetchProducts = () => async (dispatch) => {
  const response = await products.get('/products');

  console.log(response.data);

  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

export const deleteProduct = (id) => async (dispatch) => {
  await products.delete(`/products/${id}`);

  dispatch({ type: DELETE_PRODUCT, payload: id });
};

export const editProduct = (id, formValues) => async (dispatch) => {
  const response = await products.patch(`/products/${id}`, formValues);

  dispatch({ type: EDIT_PRODUCT, payload: response.data });
};
