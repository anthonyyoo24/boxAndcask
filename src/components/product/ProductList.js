import './ProductList.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';

const ProductList = () => {
  const products = useSelector((state) => Object.values(state.products));
  const searchedProducts = useSelector((state) => Object.values(state.searchedProducts));
  // const currentUserId = useSelector((state) => state.auth.userId);

  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 8;
  const totalPages =
    searchedProducts.length > 0
      ? Math.ceil(searchedProducts.length / productsPerPage)
      : Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    if (activePage > totalPages) setActivePage(1);
  }, [activePage, totalPages]);

  // const renderAdmin = (product) => {
  //   if (product.userId === currentUserId) {
  //     return (
  //       <div className="right floated content">
  //         <Link to={`/products/edit/${product.id}`} className="ui button primary">
  //           Edit
  //         </Link>
  //         <Link to={`/products/delete/${product.id}`} className="ui button negative">
  //           Delete
  //         </Link>
  //       </div>
  //     );
  //   }
  // };

  const renderList = () => {
    const list = searchedProducts.length > 0 ? searchedProducts : products;
    const paginatedList = [];

    for (let i = (activePage - 1) * productsPerPage; i < activePage * productsPerPage; i++) {
      if (list[i]) paginatedList.push(list[i]);
    }

    return paginatedList.map((product) => {
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
          {/* {renderAdmin(product)} */}
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <h2>Products</h2>
        <div className="product-list">{renderList()}</div>
      </div>
      <div className="pagination">
        <Pagination
          activePage={activePage}
          onPageChange={(e, { activePage }) => setActivePage(activePage)}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ProductList;
