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

export default (state = INITIAL_STATE, action) => {
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

      const orderQuantity = state[action.payload.id].orderQuantity;

      return {
        ...state,
        [action.payload.id]: { ...action.payload, orderQuantity },
      };
    }
    case DELETE_PRODUCT: {
      return _.omit(state, action.payload);
    }
    default:
      return state;
  }
};
