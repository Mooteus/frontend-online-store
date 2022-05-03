import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCart extends Component {
  state = {
    disabled: false,
    minProduct: false,
    maxProduct: false,
  };

  handleButton = () => {
    const { quantity } = this.props;
    const { stockQuantity } = this.props;
    if (stockQuantity === quantity) {
      this.setState({
        disabled: true,
        maxProduct: true,
      });
      return false;
    }
    this.setState({
      disabled: false,
      maxProduct: false,
    });
    return true;
  };

  handleAmount = ({ id, title, thumbnail, price, quantity }, { target }) => {
    const { name } = target;
    const { addCart, subCart } = this.props;
    if (this.handleButton()) {
      if (name === 'add-button') {
        addCart({ id, title, thumbnail, price, quantity });
      }
      if (name === 'rem-button') {
        subCart({ id, title, thumbnail, price, quantity });
      }
    } else if (name === 'rem-button') {
      subCart({ id, title, thumbnail, price, quantity });
    }
  };

  render() {
    const { id, title, thumbnail, price, quantity } = this.props;
    const products = { id, title, thumbnail, price, quantity };
    const { disabled, minProduct, maxProduct } = this.state;
    return (
      <div key={ id }>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <img src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {price * quantity}
        </h4>
        <div>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ (event) => this.handleAmount(products, event) }
            name="add-button"
            disabled={ disabled }
          >
            +
          </button>

          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ (event) => this.handleAmount(products, event) }
            name="rem-button"
          >
            -
          </button>
          {minProduct ? (
            <p>A quantidade de produtos não pode ser menor que zero</p>
          ) : null}
          {maxProduct ? <p>A quantidade maxima em estoque foi atingida</p> : null}
        </div>
      </div>
    );
  }
}

ProductCart.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  stockQuantity: PropTypes.number.isRequired,
  addCart: PropTypes.func.isRequired,
  subCart: PropTypes.func.isRequired,
};
export default ProductCart;
