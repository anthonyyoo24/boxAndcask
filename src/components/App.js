import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import ProductDetails from './product/ProductDetails';
import ProductList from './product/ProductList';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <HashRouter>
        <div>
          <Header />
          <Route path="/" exact component={ProductList} />
          <Route path="/product/:id" exact component={ProductDetails} />
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
