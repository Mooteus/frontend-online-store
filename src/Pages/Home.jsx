import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.module.css';

class Home extends Component {
  render() {
    return (
      <main>
        <label htmlFor="input">
          <input id="input" type="text" />
          <Link to="/cart" data-testid="shopping-cart-button">
            <img src="https://fav.farm/🛒" alt="Button Carrinho de Compras" />
          </Link>
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </main>
    );
  }
}

export default Home;
