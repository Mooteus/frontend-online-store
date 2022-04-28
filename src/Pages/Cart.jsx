import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  render() {
    const { productsCart } = this.props;
    console.log(productsCart);
    return (
      <main>
        {productsCart.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          productsCart.map(({ id, title, thumbnail, price }) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{title}</p>
              <img src={ thumbnail } alt={ title } />
              <h4>
                R$:
                {' '}
                {price}
              </h4>
              <div>
                <button type="button" onClick={ this.handleAmount } value="+">
                  +
                </button>
                <p data-testid="shopping-cart-product-quantity">1</p>
                <button type="button" onClick={ this.handleAmount } value="-">
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    );
  }
}

Cart.propTypes = {
  productsCart: PropTypes.arrayOf(Object).isRequired,
};
export default Cart;
