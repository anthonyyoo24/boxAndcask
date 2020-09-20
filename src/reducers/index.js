import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import paymentReducer from './paymentReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  products: productReducer,
  cart: cartReducer,
  payment: paymentReducer,
  searchedProducts: searchReducer,
});
