import authReducer from './authReducer';
import { newState } from '../helpers/utilities';
import { SIGN_IN, SIGN_OUT } from '../actions/types';

describe('Authentication Reducer', () => {
  it('returns the initial state when the reducer initializes', () => {
    expect(newState(authReducer, undefined)).toEqual({ isSignedIn: null, userId: null });
  });

  it('returns the new state when receiving type SIGN_IN', () => {
    expect(newState(authReducer, undefined, SIGN_IN, 'abcde123456')).toEqual({
      isSignedIn: true,
      userId: 'abcde123456',
    });
  });

  it('returns the new state when receiving type SIGN_OUT', () => {
    expect(newState(authReducer, undefined, SIGN_OUT)).toEqual({ isSignedIn: false, userId: null });
  });
});
