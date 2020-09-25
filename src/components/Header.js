import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import SearchBar from './SearchBar';

const Header = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div className="ui item">
          <Link to="/products/new" className="ui button primary">
            Create Product
          </Link>
        </div>
      );
    }
  };

  const cart = require(`../img/svg/icon-shopping-cart.svg`);

  return (
    <div className="ui secondary  menu">
      <Link to="/" className="active item">
        Box&Cask
      </Link>

      <div className="right menu">
        <SearchBar />
        {renderCreate()}
        <Link to="/cart" className="ui item cart">
          <img src={cart} alt="shopping cart" />
          Cart
        </Link>
        <div className="ui item">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;
