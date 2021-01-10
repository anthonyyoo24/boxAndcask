import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import paymentReducer from './paymentReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer, // special key name
  products: productReducer,
  cart: cartReducer,
  payment: paymentReducer,
  searchedProducts: searchReducer,
});
