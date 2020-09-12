import _ from 'lodash';
import {
  CREATE_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_PRODUCTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case EDIT_PRODUCT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PRODUCT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
