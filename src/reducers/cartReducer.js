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
      if (!state[action.payload.id]) {
        localStorage.setItem(
          'cart',
          JSON.stringify({ ...state, [action.payload.id]: action.payload })
        );

        return { ...state, [action.payload.id]: action.payload };
      } else {
        const previousQuantity = parseInt(state[action.payload.id].orderQuantity);
        action.payload.orderQuantity = previousQuantity + parseInt(action.payload.orderQuantity);

        localStorage.setItem(
          'cart',
          JSON.stringify({ ...state, [action.payload.id]: action.payload })
        );

        return { ...state, [action.payload.id]: action.payload };
      }
    }
    case REMOVE_FROM_CART: {
      localStorage.setItem('cart', JSON.stringify(_.omit(state, action.payload)));

      return _.omit(state, action.payload);
    }
    case EMPTY_CART: {
      localStorage.setItem('cart', JSON.stringify({}));

      return {};
    }
    case CHANGE_QUANTITY: {
      localStorage.setItem(
        'cart',
        JSON.stringify({ ...state, [action.payload.id]: action.payload })
      );

      return { ...state, [action.payload.id]: action.payload };
    }
    case EDIT_PRODUCT: {
      if (!state[action.payload.id]) return state;

      const orderQuantity = state[action.payload.id].orderQuantity;

      localStorage.setItem(
        'cart',
        JSON.stringify({
          ...state,
          [action.payload.id]: { ...action.payload, orderQuantity },
        })
      );

      return {
        ...state,
        [action.payload.id]: { ...action.payload, orderQuantity },
      };
    }
    case DELETE_PRODUCT: {
      localStorage.setItem('cart', JSON.stringify(_.omit(state, action.payload)));

      return _.omit(state, action.payload);
    }
    default:
      return state;
  }
};
