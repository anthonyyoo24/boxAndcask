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
import products from '../apis/products';
import history from '../history';

// send an array of products
// dispatch FETCH_PRODUCTS?
// export const shipOutStock = () => (dispatch, getState) => {
//   const cart = getState().cart;
//   const products = getState().products;

//   const updatedProducts = Object.values(products).map((product) => {
//     if (cart[product.id]) {
//       const leftOverStock = product.stock - cart[product.id].orderQuantity;

//       console.log(leftOverStock);
//       product.stock = leftOverStock;
//     }

//     return product;
//   });

//   console.log(updatedProducts);

//   dispatch({ type: SHIP_STOCK, payload: updatedProducts });
// };

export const searchProducts = (term) => (dispatch, getState) => {
  const products = getState().products;
  const searchedProducts = Object.values(products).filter((product) =>
    product.name.toLowerCase().includes(term.toLowerCase())
  );

  dispatch({ type: SEARCH_PRODUCTS, payload: searchedProducts });

  history.push('/');
};

// export const updateStock = () => async (dispatch, getState) => {
//   const cart = getState().cart;
//   const products = getState().products;

//   Object.values(products).forEach(async (product) => {
//     if (cart[product.id]) {
//       const leftOverStock = product.stock - cart[product.id].orderQuantity;

//       product.stock = leftOverStock;

//       const response = await products.put(`/products/${product.id}`, product);
//       // const response = await products.patch(`/products/${id}`, formValues);
//     }
//   });
// };

export const paymentSuccess = () => (dispatch, getState) => {
  const cart = getState().cart;
  const productList = getState().products;

  Object.values(productList).forEach(async (product) => {
    if (cart[product.id]) {
      const leftOverStock = product.stock - cart[product.id].orderQuantity;

      const response = await products.patch(`/products/${product.id}`, { stock: leftOverStock });

      dispatch({ type: EDIT_PRODUCT, payload: response.data });
    }
  });

  dispatch({ type: PAYMENT_SUCCESS });
};

export const paymentFail = () => {
  return { type: PAYMENT_FAIL };
};

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

  console.log(response.data);

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
