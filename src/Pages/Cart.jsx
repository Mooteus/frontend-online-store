import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCart';

class Cart extends Component {
  render() {
    const { productsCart, addCart, subCart, handleAmount, handleProduct } = this.props;
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
              handleProduct={ handleProduct }
            />
          ))
        )}
        {productsCart.length > 0 && (
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
  handleProduct: PropTypes.shape({
    disabledIncrease: PropTypes.bool.isRequired,
    minProduct: PropTypes.bool.isRequired,
    maxProduct: PropTypes.bool.isRequired,
    disabledDecrease: PropTypes.bool.isRequired,
  }).isRequired,
};
export default Cart;
