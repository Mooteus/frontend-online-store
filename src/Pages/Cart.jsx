import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCart';

class Cart extends Component {
  render() {
    const { productsCart, addCart, subCart, handleAmount } = this.props;
    return (
      <main>
        <Link to="/">
          <button type="button" data-testid="checkout-products">
            Inicio
          </button>
        </Link>
        {productsCart.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          productsCart.map((products, i) => (
            <ProductCart
              key={ i }
              { ...products }
              handleAmount={ handleAmount }
              addCart={ addCart }
              subCart={ subCart }
            />
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
  addCart: PropTypes.func.isRequired,
  subCart: PropTypes.func.isRequired,
  handleAmount: PropTypes.func.isRequired,
};
export default Cart;
