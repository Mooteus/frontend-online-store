import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  render() {
    const { productsCart, quantity } = this.props;
    return (
      <>
        {productsCart.map(({ id, title, thumbnail, price }) => (
          <div key={ id }>
            <p data-testid="shopping-cart-product-name">{title}</p>
            <img src={ thumbnail } alt={ title } />
            <h4>
              R$:
              {' '}
              {price * quantity[id]?.qtde}
              {' '}
            </h4>
            <div />
          </div>
        ))}
        <form>
          <label htmlFor="fullName">
            Nome Completo
            <input name="fullName" data-testid="checkout-fullname" type="text" />
          </label>
          <label htmlFor="email">
            Email
            <input name="email" data-testid="checkout-email" type="email" />
          </label>
          <label htmlFor="cpf">
            CPF
            <input name="cpf" data-testid="checkout-cpf" type="text" />
          </label>
          <label htmlFor="telefone">
            Telefone
            <input name="telefone" data-testid="checkout-phone" type="text" />
          </label>
          <label htmlFor="cep">
            CEP
            <input name="cep" data-testid="checkout-cep" type="text" />
          </label>
          <label htmlFor="address">
            Endereço
            <input name="address" data-testid="checkout-address" type="text" />
          </label>

          <button type="submit">Finalizar Compra</button>
        </form>
      </>
    );
  }
}

Checkout.propTypes = {
  productsCart: PropTypes.arrayOf(Object).isRequired,
  quantity: PropTypes.arrayOf(Object).isRequired,
};
export default Checkout;
