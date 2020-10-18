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
          <i className="plus square icon"></i>
          Create Product
        </Link>
      );
    }
  };

  return (
    <div className="header">
      <Link to="/" className="header__home tertiary button-2of4">
        Box&Cask
      </Link>
      <SearchBar />
      <div className="header__right-div">
        {renderCreate()}
        <Link to="/cart" className="header__cart tertiary button-1of4">
          <i className="shopping cart icon"></i>
          {cartQuantity}
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
