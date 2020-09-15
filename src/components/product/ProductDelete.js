import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProduct } from '../../actions';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';

const ProductDelete = (props) => {
  const product = useSelector((state) => state.products[props.match.params.id]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const renderActions = () => {
    const { id } = props.match.params;

    return (
      <React.Fragment>
        <button onClick={() => dispatch(deleteProduct(id))} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (!product) return 'Are you sure you want to delete this product?';

    return `Are you sure you want to delete the product: ${product.name}?`;
  };

  return (
    <div>
      <Modal
        title="Delete Product"
        content={renderContent()}
        actions={renderActions()}
        onDismiss={() => history.push('/')}
      />
    </div>
  );
};

export default ProductDelete;
