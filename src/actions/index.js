import { SIGN_IN, SIGN_OUT } from './types';

export const changeAuth = (isSignedIn, userId) => {
  if (isSignedIn) {
    return {
      type: SIGN_IN,
      payload: userId,
    };
  } else {
    return {
      type: SIGN_OUT,
    };
  }
};
