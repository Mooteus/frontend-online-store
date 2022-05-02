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
    this.setState(
      ({ cart }) => ({
        cart: [...cart, product],
      }),
      () => {
        this.countProducts();
        this.saveStorage();
      },
    );
  };

  countProducts = () => {
    const { cart } = this.state;
    const allIds = cart.map(({ id }) => id);
    const allQuantitys = allIds.reduce((acc, curr) => {
      console.log('ACC', acc);
      console.log('CURR', curr);
      if (!acc[curr]) {
        acc[curr] = {
          quantity: 1,
        };
      } else {
        acc[curr].quantity += 1;
      }
      return acc;
    }, []);
    console.log('App', allQuantitys);
    this.setState({
      allQuantitys,
    });
  };

  filterCart = () => {
    const { cart } = this.state;
    let allIds = cart.map(({ id }) => id);
    allIds = [...new Set(allIds)];
    const productsCart = cart.filter(
      ({ id }) => allIds.some((ids) => ids === id) && allIds.splice(0, 1),
    );
    return productsCart;
  };

  saveStorage = () => {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const { allQuantitys, cart } = this.state;
    const productsCart = this.filterCart();

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/cart"
            render={ () => (
              <Cart
                productsCart={ productsCart }
                allQuantitys={ allQuantitys }
                handleAmount={ this.handleAmount }
              />
            ) }
          />
          <Route
            exact
            path="/checkout"
            render={ () => (
              <Checkout
                productsCart={ productsCart }
                allQuantitys={ allQuantitys }
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
              <ProductDetails { ...PropsRouter } addCart={ this.addCart } cart={ cart } />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
