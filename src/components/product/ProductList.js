import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, searchProducts } from '../../actions';

const ProductList = () => {
  const products = useSelector((state) => Object.values(state.products));
  const searchedProducts = useSelector((state) => Object.values(state.searchedProducts));
  const currentUserId = useSelector((state) => state.auth.userId);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!searchedProducts) dispatch(fetchProducts());
  // }, [dispatch, searchedProducts]);

  const renderAdmin = (product) => {
    if (product.userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/products/edit/${product.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/products/delete/${product.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    const list = searchedProducts.length > 0 ? searchedProducts : products;

    return list.map((product) => {
      const image = require(`../img/${product.image}`);

      return (
        <div key={product.id} className="ui card">
          <Link to={`/products/${product.id}`} className="image">
            <img src={image} alt={product.name} />
          </Link>
          <div className="content">
            <Link to={`/products/${product.id}`} className="header">
              {product.name}
            </Link>
            <div className="meta">
              <p>${product.price}</p>
            </div>
          </div>
          {renderAdmin(product)}
        </div>
      );
    });
  };

  return (
    <div>
      <h2 className="ui header">Products</h2>
      <div className="ui three stackable cards">{renderList()}</div>
    </div>
  );
};

export default ProductList;
