import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCart extends Component {
  state = {
    quantityItem: 1,
    disabled: false,
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
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  };

  // https://pt.stackoverflow.com/questions/459413/verificar-quantas-vezes-um-n%C3%BAmero-aparece-no-array#:~:text=A%20express%C3%A3o%20counts%5Bx%5D%20%7C%7C,e%20a%20contagem%20%C3%A9%20conclu%C3%ADda.
  handleAmount = ({ target }) => {
    const { quantityItem } = this.state;
    const { name } = target;
    if (name === 'add-button') {
      this.setState(
        (prevState) => ({
          quantityItem: prevState.quantityItem + 1,
        }),
        () => this.handleButton(),
      );
    }

    if (name === 'rem-button') {
      this.setState(
        (prevState) => ({
          quantityItem: prevState.quantityItem - 1,
        }),
        () => this.handleButton(),
      );
    }

    if (quantityItem < 1) {
      this.setState({
        quantityItem: 1,
      });
    }
  };

  render() {
    const { id, title, thumbnail, price, stockQuantity } = this.props;
    const { quantityItem, disabled } = this.state;
    return (
      <div key={ id }>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <img src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {price}
        </h4>
        <p>{stockQuantity}</p>
        <div>
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
