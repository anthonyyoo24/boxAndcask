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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <form onSubmit={onSubmit} className="search-bar ui icon input">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        type="text"
      />
      <i onClick={onSubmit} className="search link icon"></i>
    </form>
  );
};

export default SearchBar;
