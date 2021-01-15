import './ProductCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const image = require(`../../img/${product.image}`);

  return (
    <div key={product.id} className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={image} alt={product.name} className="product-card__img" />
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

export default ProductCard;
