import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <main>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </main>
    );
  }
}

export default Cart;
