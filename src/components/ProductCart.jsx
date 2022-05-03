import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCart extends Component {
  state = {
    quantityItem: 1,
    disabled: false,
    MinProduct: false,
    maxProduct: false,
  };

  componentDidMount() {
    const { quantity } = this.props;
    this.setState({
      quantityItem: quantity,
    });
  }

  handleButton = () => {
    const { quantityItem } = this.state;
    const { stockQuantity } = this.props;
    if (stockQuantity === quantityItem) {
      this.setState({
        disabled: true,
        maxProduct: true,
      });
    } else {
      this.setState({
        disabled: false,
        maxProduct: false,
      });
    }
  };

  handleAmount = ({ target }) => {
    const { quantityItem } = this.state;
    const { name } = target;
    if (name === 'add-button') {
      if (quantityItem >= 0) {
        this.setState({
          MinProduct: false,
        });
      }
      this.setState(
        (prevState) => ({
          quantityItem: prevState.quantityItem + 1,
        }),
        () => this.handleButton(),
      );
    }

    if (name === 'rem-button') {
      if (quantityItem === 0) {
        this.setState({
          MinProduct: true,
          quantityItem: 1,
        });
      }
      this.setState(
        (prevState) => ({
          quantityItem: prevState.quantityItem - 1,
        }),
        () => this.handleButton(),
      );
    }
  };

  render() {
    const { id, title, thumbnail, price } = this.props;
    const { quantityItem, disabled, MinProduct, maxProduct } = this.state;
    return (
      <div key={ id }>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <img src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {price}
        </h4>
        <div>
          {maxProduct ? <p>A quantidade maxima em estoque foi atingida</p> : null}
          <button
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.handleAmount }
            name="add-button"
            disabled={ disabled }
          >
            +
          </button>
          <p data-testid="shopping-cart-product-quantity">{quantityItem}</p>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ (event) => this.handleAmount(event) }
            name="rem-button"
          >
            -
          </button>
          {MinProduct ? (
            <p>A quantidade de produtos não pode ser menor que zero :( </p>
          ) : null}
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
};
export default ProductCart;
