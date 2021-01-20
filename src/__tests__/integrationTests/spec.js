import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import { fetchProducts } from '../../actions';

const store = createStore(reducers, applyMiddleware(reduxThunk));

describe('fetchProducts action creator', () => {
  it('updates the store correctly', async () => {
    const expectedState = {
      1: {
        id: 1,
        name: 'Magritte Sofa',
        price: 970.99,
        stock: 9,
        image: 'magritte-sofa.jpg',
        userId: 'alHpxqwJ99NDG8f4ari2DD6nWtF3',
        description: 'Great Sofa',
      },
      2: {
        id: 2,
        name: 'Josephine Sofa',
        price: 800.99,
        stock: 12,
        image: 'josephine-sofa.jpg',
        userId: 'alHpxqwJ99NDG8f4ari2DD6nWtF3',
        description: 'Great Sofa',
      },
      3: {
        id: 3,
        name: 'Monahan Sofa',
        price: 1100.99,
        stock: 7,
        image: 'monahan-sofa.jpg',
        userId: 'alHpxqwJ99NDG8f4ari2DD6nWtF3',
        description: 'Great Sofa',
      },
    };

    await store.dispatch(fetchProducts());
    const newState = store.getState();
    expect(newState.products).toEqual(expectedState);
  });
});
