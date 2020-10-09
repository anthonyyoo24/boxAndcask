import './Header.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import SearchBar from './SearchBar';

const Header = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const cart = useSelector((state) => Object.values(state.cart));

  const cartQuantity = cart.reduce((acc, product) => {
    return acc + parseInt(product.orderQuantity);
  }, 0);

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <Link to="/products/new" className="header__create tertiary button-1of4">
          Create Product
        </Link>
      );
    }
  };

  // const cartIcon = require(`../img/svg/icon-shopping-cart.svg`);

  return (
    <div className="header">
      <Link to="/" className="header__home tertiary button-2of4">
        Box&Cask
      </Link>

      <div className="header__div">
        {renderCreate()}
        <SearchBar />
        <Link to="/cart" className="header__cart tertiary button-1of4">
          {/* <img src={cartIcon} alt="shopping cart" /> */}
          <i className="shopping cart icon"></i>
          {cartQuantity}
        </Link>
      </div>
      <GoogleAuth />
    </div>
  );
};

export default Header;
