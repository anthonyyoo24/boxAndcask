import paymentReducer from './paymentReducer';
import { newState } from '../helpers/utilities';
import { PAYMENT_SUCCESS, PAYMENT_FAIL } from '../actions/types';

describe('Payment Reducer', () => {
  it('returns the initial state when the reducer initializes', () => {
    expect(newState(paymentReducer, undefined)).toBe(false);
  });

  it('returns the new state when it receives type PAYMENT_SUCCESS', () => {
    expect(newState(paymentReducer, undefined, PAYMENT_SUCCESS)).toBe(true);
  });

  it('returns the new state when it receives type PAYMENT_FAIL', () => {
    expect(newState(paymentReducer, undefined, PAYMENT_FAIL)).toBe(false);
  });
});
