import '../sass/style.scss';
import './ShoppingCart.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeQuantity, emptyCart, paymentFail, removeFromCart } from '../actions';
import CartSummary from './CartSummary';
// import history from '../history';

const ShoppingCart = ({ history }) => {
  const cart = useSelector((state) => Object.values(state.cart));
  const paymentSuccess = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  const renderQuantity = (product) => {
    if (product.stock > 0) {
      return (
        <div className="cart-item__quantity">
          <i
            className="minus icon"
            onClick={() => {
              if (product.orderQuantity > 1)
                dispatch(changeQuantity(product, parseInt(product.orderQuantity) - 1));
            }}
          ></i>
          <input
            onChange={(e) => {
              if (parseInt(e.target.value) > product.stock) {
                dispatch(changeQuantity(product, product.stock));
              } else if (parseInt(e.target.value) < 1 || !e.target.value) {
                dispatch(changeQuantity(product, 1));
              } else {
                dispatch(changeQuantity(product, e.target.value));
              }
            }}
            value={product.orderQuantity}
            type="number"
          />
          <i
            className="plus icon"
            onClick={() => {
              if (product.orderQuantity < product.stock)
                dispatch(changeQuantity(product, parseInt(product.orderQuantity) + 1));
            }}
          ></i>
        </div>
      );
    }
  };

  const renderList = () => {
    return cart.map((product) => {
      const image = require(`../img/${product.image}`);

      return (
        <div key={product.id} className="cart-item">
          <img
            onClick={() => history.push(`/products/${product.id}`)}
            className="cart-item__img"
            src={image}
            alt={product.name}
          />
          <Link to={`/products/${product.id}`} className="cart-item__name">
            {product.name}
          </Link>
          {renderQuantity(product)}
          <span className="cart-item__price">${product.price}</span>
          <i className=" x icon" onClick={() => dispatch(removeFromCart(product.id))}></i>
        </div>
      );
    });
  };

  const renderEmptyCart = () => {
    if (cart.length > 1) {
      return (
        <button
          onClick={() => dispatch(emptyCart())}
          className="tertiary button-2of4"
        >
          Empty Cart
        </button>
      );
    }
  };

  useEffect(() => {
    if (paymentSuccess && cart.length === 0) {
      dispatch(paymentFail());
      history.push('/');
    }
  }, [cart.length, paymentSuccess, dispatch]);

  if (!paymentSuccess && cart.length > 0) {
    return (
      <div className="cart-page">
        <div className="shopping-cart">
          {renderList()}
          {renderEmptyCart()}
        </div>
        <CartSummary />
      </div>
    );
  } else if (paymentSuccess && cart.length > 0) {
    setTimeout(() => {
      dispatch(emptyCart());
    }, 4000);

    return (
      <div className="ui segment" style={{ maxWidth: '50vw', margin: 'auto' }}>
        <div className="ui success message success-div">
          <i className="check circle icon" style={{ fontSize: '40px', paddingTop: '8px' }}></i>
          <div>
            <div className="header">Thank you for your order!</div>
            <p>Your payment has been accepted</p>
          </div>
        </div>
      </div>
    );
  } else if (!paymentSuccess && cart.length === 0) {
    return <h2>Your shopping cart is empty</h2>;
  } else if (paymentSuccess && cart.length === 0) {
    return null;
  }
};

export default ShoppingCart;
