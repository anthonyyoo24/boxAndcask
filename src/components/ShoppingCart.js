import '../sass/style.scss';
import './ShoppingCart.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, emptyCart, paymentFail, removeFromCart } from '../actions';
import CartSummary from './CartSummary';
import history from '../history';

const ShoppingCart = () => {
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
              } else if (parseInt(e.target.value) < 1) {
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

  // const renderQuantity = (stock, initialValue, product) => {
  //   if (stock > 0) {
  //     const options = [];

  //     for (let i = 1; i <= stock; i++) {
  //       options.push(
  //         <option key={i} value={i}>
  //           {i}
  //         </option>
  //       );
  //     }

  //     return (
  //       <div>
  //         Quantity:&nbsp;
  //         <select
  //           onChange={(e) => {
  //             dispatch(changeQuantity(product, e.target.value));
  //           }}
  //           defaultValue={initialValue}
  //         >
  //           {options}
  //         </select>
  //       </div>
  //     );
  //   }
  // };

  const renderList = () => {
    return cart.map((product) => {
      const image = require(`../img/${product.image}`);

      return (
        <div key={product.id} className="ui vertical segment cart__item">
          <img className="cart__img" src={image} alt={product.name} />
          <div className="cart__content">
            <h3>{product.name}</h3>
            <h4>${product.price}</h4>
            {renderQuantity(product)}
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

  useEffect(() => {
    if (paymentSuccess && cart.length === 0) {
      dispatch(paymentFail());
      history.push('/');
    }
  }, [cart.length, paymentSuccess, dispatch]);

  if (!paymentSuccess && cart.length > 0) {
    return (
      <div className="cart-page">
        <div className="cart">
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

  // ]V#Hd8?_
};

export default ShoppingCart;
