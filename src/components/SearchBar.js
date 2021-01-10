import './SearchBar.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts, searchProducts } from '../actions';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(searchProducts(term));
  };

  // Fetching products from here because we want to be able to search for products when we are currently
  // viewing pages that are not the home page (where the list of products are displayed). In order to
  // search for products, we need to first fetch the full list of products first.

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <form onSubmit={onSubmit} className="search-bar ui icon input">
      <input value={term} onChange={(e) => setTerm(e.target.value)} type="text" />
      <i onClick={onSubmit} className="search link icon"></i>
    </form>
  );
};

export default SearchBar;
