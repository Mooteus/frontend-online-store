import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/" component={ Home } />
        <Route path="/product/:id" component={ ProductDetails } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
