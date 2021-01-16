export const addCartLocalStorage = (cart, product, orderQuantity) => {
  localStorage.setItem(
    'cart',
    JSON.stringify({ ...cart, [product.id]: { ...product, orderQuantity } })
  );
};
