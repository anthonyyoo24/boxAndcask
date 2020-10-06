import '../../sass/style.scss';
import '../../sass/components.scss';
import './ProductDetails.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const renderQuantity = (stock) => {
    if (stock > 0) {
      return (
        <div className="product-details__quantity">
          <i
            className="minus icon"
            onClick={() => {
              if (orderQuantity > 1) setOrderQuantity(parseInt(orderQuantity) - 1);
            }}
          ></i>
          <input
            onChange={(e) => {
              if (parseInt(e.target.value) > stock) {
                setOrderQuantity(stock);
              } else if (parseInt(e.target.value) < 1) {
                setOrderQuantity(1);
              } else {
                setOrderQuantity(e.target.value);
              }
            }}
            value={orderQuantity}
            type="number"
          />
          <i
            className="plus icon"
            onClick={() => {
              if (orderQuantity < stock) setOrderQuantity(parseInt(orderQuantity) + 1);
            }}
          ></i>
        </div>
      );
    }
  };

  const renderAdmin = (product) => {
    if (product.userId === currentUserId) {
      return (
        <div className="product-details__admin">
          <button
            onClick={() => props.history.push(`/products/edit/${product.id}`)}
            className="product-details__btn--secondary button-2of4"
          >
            Edit
          </button>
          <button
            onClick={() => props.history.push(`/products/delete/${product.id}`)}
            className="product-details__btn--tertiary button-2of4"
          >
            Delete
          </button>
        </div>
      );
    }
  };

  const renderStockStatus = () => {
    if (product.stock > 0) {
      return (
        <div className="product-details__stock-status">
          <i className="product-details__stock-status--available check circle icon"></i>
          <span>{product.stock}</span> left in stock
        </div>
      );
    } else {
      return (
        <div className="product-details__stock-status">
          <i className="product-details__stock-status--unavailable times circle icon"></i>Out of
          stock
        </div>
      );
    }
  };

  // const renderQuantity = (stock) => {
  //   if (stock > 0) {
  //     const options = [];

  //     for (let i = 1; i <= stock; i++) {
  //       options.push(
  //         <option key={i} value={i}>
  //           {i}
  //         </option>
  //       );
  //     }

  //     return (
  //       <div className="product-details__quantity">
  //         Quantity:&nbsp;
  //         <select
  //           onChange={(e) => {
  //             setOrderQuantity(e.target.value);
  //           }}
  //           value={orderQuantity}
  //         >
  //           {options}
  //         </select>
  //       </div>
  //     );
  //   }
  // };

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
        <div className="product-details__actions">
          {product.stock > 0 ? (
            <button
              onClick={() => dispatch(addToCart(product, orderQuantity))}
              className="product-details__btn--primary button-2of4"
            >
              Add to Cart
            </button>
          ) : null}
          {renderAdmin(product)}
        </div>
        <div className="product-details__description">
          <p className="product-details__description-header">Product Description</p>
          <p className="product-details__description-text">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
