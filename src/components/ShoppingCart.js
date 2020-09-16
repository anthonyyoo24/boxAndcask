import './css/style.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, emptyCart, removeFromCart } from '../actions';
import OrderSummary from './OrderSummary';

const ShoppingCart = () => {
  const cart = useSelector((state) => Object.values(state.cart));
  const dispatch = useDispatch();

  const renderQuantity = (stock, initialValue, product) => {
    if (stock > 0) {
      const options = [];

      for (let i = 1; i <= stock; i++) {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      return (
        <React.Fragment>
          Quantity:&nbsp;
          <select
            onChange={(e) => {
              dispatch(changeQuantity(product, e.target.value));
            }}
            defaultValue={initialValue}
          >
            {options}
          </select>
        </React.Fragment>
      );
    }
  };

  const renderList = () => {
    return cart.map((product) => {
      const image = require(`./img/${product.image}`);

      return (
        <div key={product.id} className="ui vertical segment cart__item">
          <img className="cart__img" src={image} alt={product.name} />
          <div className="cart__content">
            <h3>{product.name}</h3>
            <h4>${product.price}</h4>
            {renderQuantity(product.stock, product.orderQuantity, product)}
            <br />
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="ui button negative"
            >
              Remove
            </button>
          </div>
        </div>
      );
    });
  };

  const renderEmptyCart = () => {
    if (cart.length > 1) {
      return (
        <button onClick={() => dispatch(emptyCart())} className="ui button negative">
          Empty Cart
        </button>
      );
    }
  };

  if (cart.length === 0) return <h2>Your shopping cart is empty</h2>;

  return (
    <div className="cart-page">
      <div className="cart">
        {renderList()}
        {renderEmptyCart()}
      </div>
      <OrderSummary />
    </div>
  );
};

export default ShoppingCart;
