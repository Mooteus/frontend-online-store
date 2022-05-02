import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    const { productsCart, quantity, handleAmount } = this.props;
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
                {' '}
              </h4>
              <div>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={ handleAmount }
                  id="add-button"
                  value={ id }
                >
                  +
                </button>
                <p data-testid="shopping-cart-product-quantity">{quantity[id]?.qtde}</p>
                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  onClick={ handleAmount }
                  id="rem-button"
                  value={ id }
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
        {productsCart.length === 0 ? null : (
          <Link to="/checkout">
            <button type="button" data-testid="checkout-products">
              Finalizar Compra
            </button>
          </Link>
        )}
      </main>
    );
  }
}

Cart.propTypes = {
  productsCart: PropTypes.arrayOf(Object).isRequired,
  quantity: PropTypes.arrayOf(Object).isRequired,
  handleAmount: PropTypes.func.isRequired,
};
export default Cart;
