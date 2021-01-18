import _ from 'lodash';
import { SEARCH_PRODUCTS } from '../actions/types';

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
};

export default searchReducer;
