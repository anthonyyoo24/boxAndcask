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

  describe('When the action object has type EDIT_PRODUCT', () => {
    const editedProduct = {
      id: 1,
      name: 'Cavette Sofa',
      price: 2000.99,
      stock: 9,
    };

    describe('When the previous state is empty', () => {
      it('returns the previous state', () => {
        expect(newState(productReducer, {}, EDIT_PRODUCT, editedProduct)).toEqual({});
      });
      it('returns the previous state when there is no action payload', () => {
        expect(newState(productReducer, {}, EDIT_PRODUCT)).toEqual({});
      });
    });

    describe('When the previous state has one product', () => {
      it('returns the previous state when you try to edit a product that is not in the previous state', () => {
        const prevState = { 2: { id: 2, name: 'Josephine Sofa', price: 1200.99, stock: 7 } };

        expect(newState(productReducer, prevState, EDIT_PRODUCT, editedProduct)).toEqual(prevState);
      });

      it('returns new state that includes the newly edited product', () => {
        const prevState = { 1: { id: 1, name: 'Josephine Sofa', price: 1200.99, stock: 7 } };

        expect(newState(productReducer, prevState, EDIT_PRODUCT, editedProduct)).toEqual({
          [editedProduct.id]: editedProduct,
        });
      });
    });

    describe('When the previous state has two products', () => {
      it('returns the previous state when you try to edit a product that is not in the previous state', () => {
        const prevState = {
          2: { id: 2, name: 'Josephine Sofa', price: 1200.99, stock: 7 },
          3: { id: 3, name: 'Magritte Sofa', price: 2500.99, stock: 20 },
        };

        expect(newState(productReducer, prevState, EDIT_PRODUCT, editedProduct)).toEqual(prevState);
      });

      it('returns new state that includes the newly edited product', () => {
        const prevState = {
          1: { id: 1, name: 'Josephine Sofa', price: 1200.99, stock: 7 },
          2: { id: 2, name: 'Magritte Sofa', price: 2500.99, stock: 20 },
        };

        expect(newState(productReducer, prevState, EDIT_PRODUCT, editedProduct)).toEqual({
          ...prevState,
          [editedProduct.id]: editedProduct,
        });
      });
    });
  });

  describe('When the action object has type DELETE_PRODUCT', () => {
    const testInvalidCases = (prevState = {}) => {
      it('returns just the previous state when there is no action payload', () => {
        expect(newState(productReducer, prevState, DELETE_PRODUCT)).toEqual(prevState);
      });
      it('returns just the previous state when the product to delete is not in the previous state', () => {
        expect(newState(productReducer, prevState, DELETE_PRODUCT, 10)).toEqual(prevState);
      });
    };

    describe('When the previous state is empty', () => {
      testInvalidCases();
    });

    describe('When the previous state has one product', () => {
      const prevState = { 1: { id: 1, name: 'Cavette Sofa', price: 1200.99, stock: 7 } };

      testInvalidCases(prevState);

      it('returns an empty state when you delete the product in the previous state', () => {
        expect(newState(productReducer, prevState, DELETE_PRODUCT, 1)).toEqual({});
      });
    });

    describe('When the previous state has two products', () => {
      const prevState = {
        1: { id: 1, name: 'Cavette Sofa', price: 1200.99, stock: 7 },
        2: { id: 2, name: 'Josephine Sofa', price: 1500.99, stock: 20 },
      };

      testInvalidCases(prevState);

      it('returns a new state that includes the one other product that was not deleted', () => {
        expect(newState(productReducer, prevState, DELETE_PRODUCT, 1)).toEqual({
          2: { id: 2, name: 'Josephine Sofa', price: 1500.99, stock: 20 },
        });
      });
    });
  });

  describe('When the action object has type FETCH_PRODUCT', () => {
    const fetchProductTest = (prevState = {}) => {
      it('returns just the previous state when the fetched product does not exist', () => {
        expect(newState(productReducer, prevState, FETCH_PRODUCT)).toEqual(prevState);
      });

      it('returns the new state that has the fetched product', () => {
        const product = { id: 1, name: 'Magritte Sofa', price: 1599.99, stock: 10 };

        expect(newState(productReducer, prevState, FETCH_PRODUCT, product)).toEqual({
          ...prevState,
          1: product,
        });
      });
    };

    describe('When the previous state is empty', () => {
      fetchProductTest();
    });

    describe('When the previous state has one product', () => {
      const prevState = { 2: { id: 2, name: 'Cavette Sofa', price: 1200.99, stock: 7 } };

      fetchProductTest(prevState);
    });

    describe('When the previous state has two products', () => {
      const prevState = {
        2: { id: 2, name: 'Cavette Sofa', price: 1200.99, stock: 7 },
        3: { id: 3, name: 'Josephine Sofa', price: 500.99, stock: 9 },
      };

      fetchProductTest(prevState);
    });
  });

  describe('When the action object has type FETCH_PRODUCTS', () => {
    const fetchProductsTest = (prevState = {}) => {
      it('returns just the previous state when the product list to fetch is empty', () => {
        expect(newState(productReducer, prevState, FETCH_PRODUCTS, [])).toEqual(prevState);
      });

      it('returns the new state when there is one fetched product', () => {
        const products = [{ id: 1, name: 'Magritte Sofa', price: 1599.99, stock: 10 }];

        expect(newState(productReducer, prevState, FETCH_PRODUCTS, products)).toEqual({
          ...prevState,
          1: products[0],
        });
      });

      it('returns the new state when there are two fetched products', () => {
        const products = [
          { id: 1, name: 'Magritte Sofa', price: 1599.99, stock: 10 },
          { id: 2, name: 'Josephine Sofa', price: 999.99, stock: 12 },
        ];

        expect(newState(productReducer, prevState, FETCH_PRODUCTS, products)).toEqual({
          ...prevState,
          ..._.mapKeys(products, 'id'),
        });
      });
    };

    describe('When the previous state is empty', () => {
      fetchProductsTest();
    });

    describe('When the previous state has one product', () => {
      const prevState = { 1: { id: 1, name: 'Cavette Sofa', price: 650.99, stock: 5 } };

      fetchProductsTest(prevState);
    });

    describe('When the previous state has two products', () => {
      const prevState = {
        3: { id: 3, name: 'Cavette Sofa', price: 650.99, stock: 5 },
        4: { id: 4, name: 'Mimi Sofa', price: 800.99, stock: 12 },
      };

      fetchProductsTest(prevState);
    });
  });
});
