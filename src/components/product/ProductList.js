import './ProductList.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';

const ProductList = () => {
  const products = useSelector((state) => Object.values(state.products));
  const searchedProducts = useSelector((state) => Object.values(state.searchedProducts));

  const [activePage, setActivePage] = useState(1);
  const productsPerPage = 8;
  const totalPages =
    searchedProducts.length > 0
      ? Math.ceil(searchedProducts.length / productsPerPage)
      : Math.ceil(products.length / productsPerPage);

  // When you submit a search term that returns only one page worth of products while you are on
  // the second page of a list of products, then you will remain on an empty page. So the below
  // useEffect hook makes sure we automatically navigate to the first page whenever we submit
  // a search term if the active page is greater than the total number of pages.
  useEffect(() => {
    if (activePage > totalPages) setActivePage(1);
  }, [activePage, totalPages]);

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
        </div>
      );
    });
  };

  return (
    <div>
      <div className="product-list">{renderList()}</div>
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
