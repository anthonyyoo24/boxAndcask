import './CartSummary.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import PayPal from './PayPal';

const CartSummary = () => {
  const cart = useSelector((state) => Object.values(state.cart));
  const cartQuantity = cart.reduce((acc, product) => {
    return acc + parseInt(product.orderQuantity);
  }, 0);

  const subTotal = cart
    .reduce((acc, cur) => {
      return acc + parseFloat(cur.orderQuantity) * parseFloat(cur.price);
    }, 0)
    .toFixed(2);

  const taxes = (subTotal * 0.13).toFixed(2);
  const total = (parseFloat(subTotal) + parseFloat(taxes)).toFixed(2);

  console.log(total);

  return (
    <div className="cart-summary">
      <p className="cart-summary__title">Cart Summary</p>

      <div className="cart-summary__costs">
        <div className="cart-summary__costs-labels">
          <span>Items ({cartQuantity}):</span>
          <br />
          <span>Estimated tax:</span>
          <br />
          <span>Order Total</span>
        </div>
        <div className="cart-summary__costs-numbers">
          <span>${subTotal}</span>
          <br />
          <span>${taxes}</span>
          <br />
          <div className="divider"></div>
          <span>${total}</span>
        </div>
      </div>
      <div className="divider"></div>
      <p className="cart-summary__checkout">Checkout Now</p>
      <PayPal total={total} />
    </div>
  );
};

export default CartSummary;
