import './ProductCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div key={product.id} className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={`img/${product.image}`} alt={product.name} className="product-card__img" />
      </Link>
      <div className="product-card__content">
        <Link to={`/products/${product.id}`} className="product-card__name">
          {product.name}
        </Link>
        <p className="product-card__price">${product.price}</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  key: PropTypes.number,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

export default ProductCard;
