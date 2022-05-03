import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCart';

class Cart extends Component {
  render() {
    const { productsCart } = this.props;
    return (
      <main>
        {productsCart.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          productsCart.map((products, i) => (
            <ProductCart
              key={ i }
              { ...products }
              stockQuantity={ products.available_quantity }
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
};
export default Cart;
