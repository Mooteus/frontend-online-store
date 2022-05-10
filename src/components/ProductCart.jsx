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

  // componentDidMount() {
  //   const { handleAmount } = this.props;
  //   handleAmount();
  // }

  render() {
    const { id, title, thumbnail, price, quantity, handleAmount } = this.props;
    const products = { id, title, thumbnail, price, quantity };
    const { disabledIncrease, minProduct, maxProduct, disabledDecrease } = this.state;
    return (
      <div key={ id }>
        <p>{title}</p>
        <img src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {price * quantity}
        </h4>
        <Link to={ `/product/${id}` }>Mais detalhes</Link>
        <div>
          <button
            type="button"
            onClick={ (event) => {
              handleAmount(products, event);
            } }
            name="add-button"
            disabled={ disabledIncrease }
          >
            +
          </button>

          <p>{quantity}</p>
          <button
            type="button"
            onClick={ (event) => {
              handleAmount(products, event);
            } }
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
  handleAmount: PropTypes.func.isRequired,
};
export default ProductCart;
