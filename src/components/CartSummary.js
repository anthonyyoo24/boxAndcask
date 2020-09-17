import React from 'react';
import { useSelector } from 'react-redux';
import PayPal from './PayPal';

const CartSummary = () => {
  const cart = useSelector((state) => Object.values(state.cart));
  const itemCount = cart.reduce((acc, cur) => {
    return acc + parseInt(cur.orderQuantity);
  }, 0);
  const subTotal = cart
    .reduce((acc, cur) => {
      return acc + parseFloat(cur.orderQuantity) * parseFloat(cur.price);
    }, 0)
    .toFixed(2);

  return (
    <div className="ui card">
      <div className="content">
        <div className="header" style={{ textAlign: 'center' }}>
          Cart Summary
        </div>
      </div>
      <div className="content">
        <h4
          className="ui sub header"
          style={{ textAlign: 'center' }}
        >{`Subtotal (${itemCount} items): $${subTotal}`}</h4>
      </div>
      <div className="extra content" style={{ textAlign: 'center' }}>
        {/* <button className="ui button primary">Proceed to Checkout</button> */}
        <h4>Checkout Now</h4>
        <PayPal total={subTotal} />
      </div>
    </div>
  );
};

export default CartSummary;
