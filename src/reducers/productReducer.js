import _ from 'lodash';
import {
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/types';

const productReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_PRODUCT:
      if (!action.payload) return state;

      return { ...state, [action.payload.id]: action.payload };
    case FETCH_PRODUCTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case EDIT_PRODUCT:
      if (!action.payload || Object.keys(state).length === 0) return state;
      if (action.payload && !state[action.payload.id]) return state;

      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PRODUCT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default productReducer;
