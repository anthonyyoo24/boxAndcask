import _ from 'lodash';
import { SEARCH_PRODUCTS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
};
