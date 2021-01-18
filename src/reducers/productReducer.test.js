import _ from 'lodash';
import productReducer from './productReducer';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/types';
import { newState } from '../helpers/utilities';

const product = {
  id: 1,
  name: 'Magritte Sofa',
  price: 1599.99,
  stock: 10,
};

describe('Product Reducer', () => {
  it('returns the default state when the reducer initializes', () => {
    expect(newState(productReducer, undefined)).toEqual({});
  });

  it('returns the new state with the newly created product included when receiving type CREATE_PRODUCT', () => {
    expect(newState(productReducer, {}, CREATE_PRODUCT, product)).toEqual({
      [product.id]: product,
    });
  });

  it('returns the new state that includes the newly edited product when receiving type EDIT_PRODUCT', () => {
    const prevState = { 1: { id: 1, name: 'Josephine Sofa', price: 1200.99, stock: 7 } };

    expect(newState(productReducer, prevState, EDIT_PRODUCT, product)).toEqual({
      [product.id]: product,
    });
  });

  it('returns the new state that does not contain the deleted product when receiving type DELETE_PRODUCT', () => {
    const prevState = { 1: { id: 1, name: 'Cavette Sofa', price: 1200.99, stock: 7 } };

    expect(newState(productReducer, prevState, DELETE_PRODUCT, 1)).toEqual({});
  });

  describe('When the action object has type FETCH_PRODUCT', () => {
    it('returns just the previous state when the fetched product does not exist', () => {
      expect(newState(productReducer, {}, FETCH_PRODUCT)).toEqual({});
    });

    it('returns the new state that has the fetched product', () => {
      expect(newState(productReducer, {}, FETCH_PRODUCT, product)).toEqual({
        [product.id]: product,
      });
    });
  });

  describe('When the action object has type FETCH_PRODUCTS', () => {
    it('returns just the previous state when the product list to fetch is empty', () => {
      expect(newState(productReducer, {}, FETCH_PRODUCTS, [])).toEqual({});
    });

    it('returns the new state when there is one fetched product', () => {
      const products = [{ id: 1, name: 'Magritte Sofa', price: 1599.99, stock: 10 }];

      expect(newState(productReducer, {}, FETCH_PRODUCTS, products)).toEqual({
        1: products[0],
      });
    });

    it('returns the new state when there are two fetched products', () => {
      const products = [
        { id: 1, name: 'Magritte Sofa', price: 1599.99, stock: 10 },
        { id: 2, name: 'Josephine Sofa', price: 999.99, stock: 12 },
      ];

      expect(newState(productReducer, {}, FETCH_PRODUCTS, products)).toEqual({
        ..._.mapKeys(products, 'id'),
      });
    });
  });
});
