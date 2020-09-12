import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ProductDetails from './product/ProductDetails';
import ProductCreate from './product/ProductCreate';
import ProductList from './product/ProductList';
import ProductEdit from './product/ProductEdit';
import ProductDelete from './product/ProductDelete';
import Header from './Header';

const App = () => {
  return (
    <div className="ui container">
      <HashRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={ProductList} />
            <Route path="/products/new" exact component={ProductCreate} />
            <Route path="/products/edit/:id" exact component={ProductEdit} />
            <Route path="/products/delete/:id" exact component={ProductDelete} />
            <Route path="/products/:id" exact component={ProductDetails} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
