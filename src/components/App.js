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
            <Route path="/product/new" exact component={ProductCreate} />
            <Route path="/product/edit/:id" exact component={ProductEdit} />
            <Route path="/product/delete/:id" exact component={ProductDelete} />
            <Route path="/product/:id" exact component={ProductDetails} />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
