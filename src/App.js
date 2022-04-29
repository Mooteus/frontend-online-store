import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import ProductDetails from './Pages/ProductDetails';

class App extends Component {
  state = {
    cart: [],
    allQuantitys: [],
  };

  // saveStorage = () => {
  //   const { cart } = this.state;
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // };

  addCart = (product) => {
    this.setState(
      ({ cart }) => ({
        cart: [...cart, product],
      }),
      () => this.countProducts(),
    );
  };

  // https://pt.stackoverflow.com/questions/459413/verificar-quantas-vezes-um-n%C3%BAmero-aparece-no-array#:~:text=A%20express%C3%A3o%20counts%5Bx%5D%20%7C%7C,e%20a%20contagem%20%C3%A9%20conclu%C3%ADda.
  countProducts = () => {
    const { cart } = this.state;
    console.log('cart', cart);
    const prodIds = cart.map(({ id }) => id);
    console.log('prodIds', prodIds);
    const allQuantitys = prodIds.reduce((acc, val) => {
      if (!acc[val]) {
        acc[val] = {
          qtde: 1,
        };
      } else acc[val].qtde += 1;
      return acc;
    }, []);
    this.setState({
      allQuantitys,
    });
  };

  filterCart = () => {
    const { cart } = this.state;
    let prodIds = cart.map(({ id }) => id);
    prodIds = [...new Set(prodIds)];

    const newCart = cart.filter(
      ({ id }) => prodIds.some((prod) => prod === id) && prodIds.splice(0, 1),
    );
    return newCart;
  };

  handleAmount = ({ target }) => {
    const { id, value } = target;
    const { allQuantitys } = this.state;
    const newQuantitys = allQuantitys;

    if (id === 'add-button') {
      newQuantitys[value].qtde += 1;
    } else if (id === 'rem-button') {
      newQuantitys[value].qtde -= 1;
    }
    this.setState({
      allQuantitys: newQuantitys,
    });
  };

  render() {
    const { allQuantitys } = this.state;
    const newCart = this.filterCart();
    console.log('allQuantitys', allQuantitys);

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/cart"
            render={ () => (
              <Cart
                productsCart={ newCart }
                quantity={ allQuantitys }
                handleAmount={ this.handleAmount }
              />
            ) }
          />
          <Route
            exact
            path="/checkout"
            render={ () => (
              <Checkout
                productsCart={ newCart }
                quantity={ allQuantitys }
                handleAmount={ this.handleAmount }
              />
            ) }
          />
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
