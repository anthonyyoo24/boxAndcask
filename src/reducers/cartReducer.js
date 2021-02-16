import _ from 'lodash';
import {
  ADD_TO_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
  CHANGE_QUANTITY,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/types';

const INITIAL_STATE = JSON.parse(localStorage.getItem('cart')) || {};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case REMOVE_FROM_CART: {
      return _.omit(state, action.payload);
    }
    case EMPTY_CART: {
      return {};
    }
    case CHANGE_QUANTITY: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case EDIT_PRODUCT: {
      if (!state[action.payload.id]) return state;

      // Have to specify the orderQuantity because EDIT_PRODUCT's payload property does not include an
      // orderQuantity property. Otherwise, the number showed in the cart icon in the header will show
      // 'NaN' when a payment is successful.
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          orderQuantity: state[action.payload.id].orderQuantity,
        },
      };
    }
    case DELETE_PRODUCT: {
      return _.omit(state, action.payload);
    }
    default:
      return state;
  }
};

export default cartReducer;
