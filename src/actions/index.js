import _ from 'lodash';
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
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  SEARCH_PRODUCTS,
} from './types';
import history from '../history';
import { db } from '../services/firebase';

export const searchProducts = (term) => (dispatch, getState) => {
  const products = getState().products;
  const searchedProducts = Object.values(products).filter((product) =>
    product.name.toLowerCase().includes(term.toLowerCase())
  );

  dispatch({ type: SEARCH_PRODUCTS, payload: searchedProducts });

  history.push('/');
};

export const paymentSuccess = () => (dispatch, getState) => {
  const cart = getState().cart;
  const productList = getState().products;

  Object.values(productList).forEach(async (product) => {
    if (cart[product.id]) {
      const leftOverStock = product.stock - cart[product.id].orderQuantity;

      await db.ref(`products/${product.id}`).update({ stock: leftOverStock });

      dispatch({ type: EDIT_PRODUCT, payload: { ...product, stock: leftOverStock } });
    }
  });

  dispatch({ type: PAYMENT_SUCCESS });
};

export const paymentFail = () => {
  return { type: PAYMENT_FAIL };
};

const addCartLocalStorage = (cart, product, orderQuantity) => {
  localStorage.setItem(
    'cart',
    JSON.stringify({ ...cart, [product.id]: { ...product, orderQuantity } })
  );
};

export const addToCart = (product, orderQuantity) => (dispatch, getState) => {
  const cart = getState().cart;
  const totalQuantity = cart[product.id]
    ? parseInt(orderQuantity) + parseInt(cart[product.id].orderQuantity)
    : null;

  if (cart[product.id] && product.stock < totalQuantity) {
    addCartLocalStorage(cart, product, product.stock);

    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, orderQuantity: product.stock },
    });
  } else if (cart[product.id] && product.stock > totalQuantity) {
    addCartLocalStorage(cart, product, totalQuantity);

    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, orderQuantity: totalQuantity },
    });
  } else {
    addCartLocalStorage(cart, product, orderQuantity);

    dispatch({
      type: ADD_TO_CART,
      payload: { ...product, orderQuantity },
    });
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  const cart = getState().cart;
  localStorage.setItem('cart', JSON.stringify(_.omit(cart, id)));

  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
};

export const changeQuantity = (product, orderQuantity) => async (dispatch, getState) => {
  const cart = getState().cart;
  addCartLocalStorage(cart, product, orderQuantity);

  dispatch({
    type: CHANGE_QUANTITY,
    payload: { ...product, orderQuantity },
  });
};

export const emptyCart = () => {
  localStorage.setItem('cart', JSON.stringify({}));

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
  const products = Object.values(getState().products);
  let id;

  if (products.length > 0) {
    id = products[products.length - 1].id + 1;
  } else {
    id = 1;
  }

  const newFormValues = {
    ...formValues,
    userId,
    id,
  };

  try {
    await db.ref(`products/${id}`).set(newFormValues);
    dispatch({ type: CREATE_PRODUCT, payload: newFormValues });
  } catch (err) {
    alert('Your account does not have permission to create, edit, or delete products.');
  }

  history.push('/');
};

export const fetchProduct = (id) => async (dispatch) => {
  await db
    .ref(`products/${id}`)
    .once('value')
    .then((snapshot) => {
      const product = snapshot.val();
      dispatch({ type: FETCH_PRODUCT, payload: product });
    });
};

export const fetchProducts = () => async (dispatch) => {
  const products = [];

  await db
    .ref('products')
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((snap) => {
        products.push(snap.val());
      });
    });

  dispatch({ type: FETCH_PRODUCTS, payload: products });
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const cart = getState().cart;

  if (cart[id]) {
    localStorage.setItem('cart', JSON.stringify(_.omit(cart, id)));
  }

  try {
    await db.ref(`products/${id}`).remove();
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (err) {
    alert('Your account does not have permission to create, edit, or delete products.');
  }

  history.push('/');
};

export const editProduct = (id, formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const cart = getState().cart;

  if (cart[id]) {
    const orderQuantity = cart[id].orderQuantity;

    localStorage.setItem(
      'cart',
      JSON.stringify({
        ...cart,
        [id]: { ...formValues, id, userId, orderQuantity },
      })
    );
  }

  try {
    await db.ref(`products/${id}`).update(formValues);
    dispatch({ type: EDIT_PRODUCT, payload: { ...formValues, id, userId } });
  } catch (err) {
    alert('Your account does not have permission to create, edit, or delete products.');
  }

  history.push('/');
};
