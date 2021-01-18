import { PAYMENT_FAIL, PAYMENT_SUCCESS } from '../actions/types';

const paymentReducer = (state = false, action) => {
  switch (action.type) {
    case PAYMENT_SUCCESS:
      return true;
    case PAYMENT_FAIL:
      return false;
    default:
      return state;
  }
};

export default paymentReducer;
