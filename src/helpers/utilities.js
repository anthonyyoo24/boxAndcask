// Sets the product into the cart collection of the local storage
export const addCartLocalStorage = (cart, product, orderQuantity) => {
  localStorage.setItem(
    'cart',
    JSON.stringify({ ...cart, [product.id]: { ...product, orderQuantity } })
  );
};

// Calls the reducer you passed in with the other subsequent arguments
export const newState = (reducer, prevState, actionType = null, actionPayload = null) => {
  let action;

  if (actionType && actionPayload) {
    action = { type: actionType, payload: actionPayload };
  } else if (actionType && !actionPayload) {
    action = { type: actionType };
  } else {
    action = {};
  }

  return reducer(prevState, action);
};
