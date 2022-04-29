import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cart extends Component {
  // https://pt.stackoverflow.com/questions/459413/verificar-quantas-vezes-um-n%C3%BAmero-aparece-no-array#:~:text=A%20express%C3%A3o%20counts%5Bx%5D%20%7C%7C,e%20a%20contagem%20%C3%A9%20conclu%C3%ADda.

  render() {
<<<<<<< HEAD
    const { productsCart, quantity, handleAmount } = this.props;
    console.log(productsCart);
=======
    const { productsCart } = this.props;
>>>>>>> 37a0a6f238f2fcb466eac8237214ef0d94945d4a
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
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={ handleAmount }
                  id="add-button"
                  value={ id }
                >
                  +
                </button>
                <p
                  data-testid="shopping-cart-product-quantity"
                >
                  1
                  {/* {quantity[id]?.qtde || 1} */}
                </p>
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
