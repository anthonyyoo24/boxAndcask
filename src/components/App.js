import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ProductDetails from './product/ProductDetails';
import ProductCreate from './product/ProductCreate';
import ProductList from './product/ProductList';
import ProductEdit from './product/ProductEdit';
import ProductDelete from './product/ProductDelete';
import ShoppingCart from './ShoppingCart';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={ProductList} />
            <Route path="/products/new" exact component={ProductCreate} />
            <Route path="/products/edit/:id" exact component={ProductEdit} />
            <Route path="/products/delete/:id" exact component={ProductDelete} />
            <Route path="/products/:id" exact component={ProductDetails} />
            <Route path="/cart" exact component={ShoppingCart} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
