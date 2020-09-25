import '../css/style.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, emptyCart, paymentFail, removeFromCart } from '../actions';
import CartSummary from './CartSummary';
import history from '../history';

const ShoppingCart = () => {
  const cart = useSelector((state) => Object.values(state.cart));
  const paymentSuccess = useSelector((state) => state.payment);
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

  // return (
  //   <div className="ui segment" style={{maxWidth: '50vw', margin: 'auto'}}>
  //     <div className="ui success message success-div">
  //       <i class="check circle icon" style={{fontSize: '40px', paddingTop: '8px'}}></i>
  //       <div>
  //         <div className="header">Thank you for your order!</div>
  //         <p>Your payment has been accepted</p>
  //       </div>
  //     </div>
  //   </div>
  // );

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
  } else if (cart.length === 0 && !paymentSuccess) {
    return <h2>Your shopping cart is empty</h2>;
  } else if (cart.length === 0 && paymentSuccess) {
    dispatch(paymentFail());

    setTimeout(() => {
      history.push('/');
    }, 1000);
  }

  // ]V#Hd8?_
};

export default ShoppingCart;
