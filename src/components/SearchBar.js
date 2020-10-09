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
    <form onSubmit={onSubmit} className="ui icon input" style={{ height: '33px' }}>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <i onClick={onSubmit} className="search link icon"></i>
    </form>
  );
};

export default SearchBar;
