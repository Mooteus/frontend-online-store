import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import * as api from './services/api';

class App extends Component {
  state = {
    cart: [],
  };

  addCart = async ({ target }) => {
    const { id } = target;
    const product = await api.getProductsById(id);
    this.setState(({ cart }) => ({
      cart: [...cart, product],
    }));
  };

  render() {
    const { cart } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/cart" render={ () => <Cart productsCart={ cart } /> } />
          <Route exact path="/" render={ () => <Home addCart={ this.addCart } /> } />
          <Route
            path="/product/:id"
            render={ (PropsRouter) => (
              <ProductDetails { ...PropsRouter } addCart={ this.addCart } />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
