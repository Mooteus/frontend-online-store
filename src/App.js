import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import ProductDetails from './Pages/ProductDetails';

class App extends Component {
  state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  };

  addCart = (product) => {
    const { cart } = this.state;
    const verifyExist = cart.some(({ id }) => id === product.id);
    if (!verifyExist) {
      this.setState(
        (prevState) => ({
          cart: [...prevState.cart, product],
        }),
        () => {
          this.countProducts(product);
        },
      );
    } else {
      this.countProducts(product);
    }
  };

  subCart = ({ id }) => {
    const { cart } = this.state;
    const newCart = cart.map((product) => {
      if (product.id === id) {
        product.quantity -= 1;
      }
      return product;
    });
    this.setState(
      {
        cart: newCart,
      },
      () => this.saveStorage(),
    );
  };

  countProducts = ({ id }) => {
    const { cart } = this.state;
    const newCart = cart.map((product) => {
      if (product.id === id && product.quantity >= 1) {
        product.quantity += 1;
      }
      if (product.id === id && product.quantity === undefined) {
        product.quantity = 1;
      }
      return product;
    });
    this.setState(
      {
        cart: newCart,
      },
      () => this.saveStorage(),
    );
  };

  filterCart = () => {
    const { cart } = this.state;
    let allIds = cart.map(({ id }) => id);
    allIds = [...new Set(allIds)];
    const cartFiltered = cart.filter(
      ({ id }) => allIds.some((ids) => ids === id) && allIds.splice(0, 1),
    );
    return cartFiltered;
  };

  saveStorage = () => {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const { cart } = this.state;
    const cartFiltered = this.filterCart();

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/cart"
            render={ () => (
              <Cart
                productsCart={ cartFiltered }
                addCart={ this.addCart }
                subCart={ this.subCart }
              />
            ) }
          />
          <Route
            exact
            path="/checkout"
            render={ () => (
              <Checkout
                productsCart={ cartFiltered }
                handleAmount={ this.handleAmount }
              />
            ) }
          />
          <Route
            exact
            path="/"
            render={ () => <Home addCart={ this.addCart } cart={ cart } /> }
          />
          <Route
            path="/product/:id"
            render={ (PropsRouter) => (
              <ProductDetails
                { ...PropsRouter }
                addCart={ this.addCart }
                cart={ cartFiltered }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
