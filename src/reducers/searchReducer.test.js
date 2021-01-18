import _ from 'lodash';
import searchReducer from './searchReducer';
import { newState } from '../helpers/utilities';
import { SEARCH_PRODUCTS } from '../actions/types';

describe('Search Reducer', () => {
  it('returns the initial state when the reducer initializes', () => {
    expect(newState(searchReducer, undefined)).toEqual({});
  });

  describe('When it receives an action with the type SEARCH_PRODUCT', () => {
    it('return the new state when the searched list only has one product', () => {
      const searchedProducts = [
        {
          id: 1,
          name: 'Magritte Sofa',
          price: 1599.99,
          stock: 10,
        },
      ];

      expect(newState(searchReducer, undefined, SEARCH_PRODUCTS, searchedProducts)).toEqual({
        1: searchedProducts[0],
      });
    });

    it('returns the new state when the searched list has two products', () => {
      const searchedProducts = [
        { id: 1, name: 'Magritte Sofa', price: 1599.99, stock: 10 },
        { id: 2, name: 'Josephine Sofa', price: 999.99, stock: 12 },
      ];

      expect(newState(searchReducer, undefined, SEARCH_PRODUCTS, searchedProducts)).toEqual(
        _.mapKeys(searchedProducts, 'id')
      );
    });
  });
});
