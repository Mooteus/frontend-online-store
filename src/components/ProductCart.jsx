import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCart extends Component {
  state = {
    disabledIncrease: false,
    minProduct: false,
    maxProduct: false,
    disabledDecrease: false,
  };

  componentDidMount() {
    this.handleButton();
  }

  handleButton = () => {
    const { quantity } = this.props;
    console.log('quantity em ProductCart', quantity);
    const { stockQuantity } = this.props;
    console.log('stockQuantity em ProductCart', stockQuantity);
    if (stockQuantity === quantity) {
      this.setState({
        disabledIncrease: true,
        maxProduct: true,
      });
    } else {
      this.setState({
        disabledIncrease: false,
        maxProduct: false,
      });
    }
    if (quantity === 0) {
      this.setState({
        disabledDecrease: true,
        minProduct: true,
      });
    } else {
      this.setState({
        disabledDecrease: false,
        minProduct: false,
      });
    }
  };

  handleAmount = async ({ id, title, thumbnail, price, quantity }, { target }) => {
    const { name } = target;
    const { addCart, subCart } = this.props;
    if (name === 'add-button') {
      await addCart({ id, title, thumbnail, price, quantity });
    }
    if (name === 'rem-button') {
      await subCart({ id, title, thumbnail, price, quantity });
    }
    this.handleButton();
  };

  render() {
    const { id, title, thumbnail, price, quantity } = this.props;
    const products = { id, title, thumbnail, price, quantity };
    const { disabledIncrease, minProduct, maxProduct, disabledDecrease } = this.state;
    return (
      <div key={ id }>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <img src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {price * quantity}
        </h4>
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          Mais detalhes
        </Link>
        <div>
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ (event) => this.handleAmount(products, event) }
            name="add-button"
            disabled={ disabledIncrease }
          >
            +
          </button>

          <p data-testid="shopping-cart-product-quantity">{quantity}</p>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ (event) => this.handleAmount(products, event) }
            name="rem-button"
            disabled={ disabledDecrease }
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
