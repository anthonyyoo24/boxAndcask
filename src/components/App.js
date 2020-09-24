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
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from './Unauthorized';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={ProductList} />
            <ProtectedRoute path="/products/new" exact component={ProductCreate} />
            <ProtectedRoute path="/products/edit/:id" exact component={ProductEdit} />
            <ProtectedRoute path="/products/delete/:id" exact component={ProductDelete} />
            <Route path="/products/:id" exact component={ProductDetails} />
            <Route path="/cart" exact component={ShoppingCart} />
            <Route path="/unauthorized" exact>
              <Unauthorized />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
