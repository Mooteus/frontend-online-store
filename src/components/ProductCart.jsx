import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cart from '../Pages/Cart';

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

  handleButton = (available_quantity) => {
    const { quantityItem } = this.state;
    if (available_quantity === quantityItem) {
      this.setState({
        disabled: true,
      });
    }
  };

  // https://pt.stackoverflow.com/questions/459413/verificar-quantas-vezes-um-n%C3%BAmero-aparece-no-array#:~:text=A%20express%C3%A3o%20counts%5Bx%5D%20%7C%7C,e%20a%20contagem%20%C3%A9%20conclu%C3%ADda.
  handleAmount = ({ target }, available_quantity) => {
    const { quantityItem } = this.state;
    const { name } = target;
    if (name === 'add-button') {
      this.setState(
        (prevState) => ({
          quantityItem: prevState.quantityItem + 1,
        }),
        () => this.handleButton(available_quantity),
      );
    }

    if (name === 'rem-button') {
      this.setState((prevState) => ({
        quantityItem: prevState.quantityItem - 1,
      }));
    }

    if (quantityItem < 1) {
      this.setState({
        quantityItem: 0,
      });
    }
  };

  render() {
    const { id, title, thumbnail, price, available_quantity } = this.props;
    const { quantityItem } = this.state;
    const { disabled } = this.state;
    return (
      <div key={ id }>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <img src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {price}
        </h4>
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
            onClick={ (event) => this.handleAmount(event, available_quantity) }
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
};
export default ProductCart;
