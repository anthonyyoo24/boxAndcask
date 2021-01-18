import cartReducer from './cartReducer';
import {
  ADD_TO_CART,
  EMPTY_CART,
  CHANGE_QUANTITY,
  REMOVE_FROM_CART,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from '../actions/types';
import { newState } from '../helpers/utilities';

const product = {
  id: 1,
  name: 'Magritte Sofa',
  price: 1599.99,
  stock: 10,
  orderQuantity: 5,
};

describe('Cart Reducer', () => {
  it('returns the default state when the reducer initializes', () => {
    expect(newState(cartReducer, undefined)).toEqual({});
  });

  it('returns the new state with the product removed when it receives type REMOVE_FROM_CART', () => {
    expect(newState(cartReducer, { [product.id]: product }, REMOVE_FROM_CART, product.id)).toEqual(
      {}
    );
  });

  it('returns the new state with order quantity of the product changed when it receives type CHANGE_QUANTITY', () => {
    const prevState = {
      1: { id: 1, name: 'Josephine Sofa', price: 1200.99, stock: 7, orderQuantity: 3 },
    };

    expect(newState(cartReducer, prevState, CHANGE_QUANTITY, product));
  });

  it('returns the new state with the added product when it receives type ADD_TO_CART', () => {
    expect(newState(cartReducer, {}, ADD_TO_CART, product)).toEqual({ [product.id]: product });
  });

  describe('When the action object has type EMPTY_CART', () => {
    it('returns an empty state when there is one product in the cart', () => {
      const prevState = {
        1: { id: 1, name: 'Josephine Sofa', price: 1200.99, stock: 7, orderQuantity: 5 },
      };

      expect(newState(cartReducer, prevState, EMPTY_CART)).toEqual({});
    });

    it('returns an empty state when there are two products in the cart', () => {
      const prevState = {
        1: { id: 1, name: 'Josephine Sofa', price: 1200.99, stock: 7, orderQuantity: 5 },
        2: { id: 2, name: 'Magritte Sofa', price: 2500.99, stock: 20, orderQuantity: 5 },
      };

      expect(newState(cartReducer, prevState, EMPTY_CART)).toEqual({});
    });
  });

  describe('When the action object has type EDIT_PRODUCT', () => {
    const editedProduct = {
      id: 1,
      name: 'Cavette Sofa',
      price: 2000.99,
      stock: 9,
    };

    it('returns the previous state when the previous state is empty', () => {
      expect(newState(cartReducer, {}, EDIT_PRODUCT, editedProduct)).toEqual({});
    });

    describe('When the previous state has one product', () => {
      it('returns the previous state when the edited product is not in the previous state', () => {
        const prevState = { 2: { id: 2, name: 'Josephine Sofa', price: 1200.99, stock: 7 } };

        expect(newState(cartReducer, prevState, EDIT_PRODUCT, editedProduct)).toEqual(prevState);
      });

      it('returns new state that includes the newly edited product', () => {
        const prevState = { 1: { id: 1, name: 'Josephine Sofa', price: 1200.99, stock: 7 } };

        expect(newState(cartReducer, prevState, EDIT_PRODUCT, editedProduct)).toEqual({
          [editedProduct.id]: editedProduct,
        });
      });
    });
  });

  describe('When the action object has type DELETE_PRODUCT', () => {
    const prevState = { 1: { id: 1, name: 'Cavette Sofa', price: 1200.99, stock: 7 } };

    it('returns the previous state with the deleted product removed', () => {
      expect(newState(cartReducer, prevState, DELETE_PRODUCT, 1)).toEqual({});
    });
  });
});
