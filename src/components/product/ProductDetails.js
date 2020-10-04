import '../../sass/style.scss';
import './ProductDetails.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, fetchProduct } from '../../actions';

const ProductDetails = (props) => {
  const [orderQuantity, setOrderQuantity] = useState(1);
  const product = useSelector((state) => state.products[props.match.params.id]);
  const currentUserId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (!product) return <div>Loading...</div>;

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

  const renderStockStatus = () => {
    if (product.stock > 0) {
      return (
        <div className="product-details__stock-status">
          <i className="product-details__stock-status--available check circle icon"></i>In stock
        </div>
      );
    } else {
      return (
        <div className="product-details__stock-status">
          <i className="product-details__stock-status--unavailable times circle icon"></i>Out of stock
        </div>
      );
    }
  };

  const renderQuantity = (stock) => {
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
        <div className="product-details__quantity">
          Quantity:&nbsp;
          <select
            onChange={(e) => {
              setOrderQuantity(e.target.value);
            }}
            value={orderQuantity}
          >
            {options}
          </select>
        </div>
      );
    }
  };

  const image = require(`../../img/${product.image}`);

  return (
    <div className="product-details">
      <img className="product-details__img" src={image} alt={product.name} />
      <div className="product-details__content">
        <p className="product-details__name">{product.name}</p>
        <p className="product-details__price">${product.price}</p>
        {renderStockStatus()}
        {renderQuantity(product.stock)}
        <br />
        {product.stock > 0 ? (
          <Link
            to="/cart"
            onClick={() => dispatch(addToCart(product, orderQuantity))}
            className="ui button primary"
          >
            Add to Cart
          </Link>
        ) : null}
        <div className="product-details__description">
          <p className="product-details__description-header">Product Description</p>
          <p className="product-details__description-text">{product.description}</p>
        </div>
        {renderAdmin(product)}
      </div>
    </div>
  );
};

export default ProductDetails;
