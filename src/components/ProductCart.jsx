import React, { Component } from 'react';

class ProdutoCart extends Component {
  state = {
    quantity: 1,
    disabled: false,
  };

  componentDidMount() {
    const { allQuantitys } = this.props;
    this.setState({
      quantity: allQuantitys,
    });
  }

  // https://pt.stackoverflow.com/questions/459413/verificar-quantas-vezes-um-n%C3%BAmero-aparece-no-array#:~:text=A%20express%C3%A3o%20counts%5Bx%5D%20%7C%7C,e%20a%20contagem%20%C3%A9%20conclu%C3%ADda.
  handleAmount = ({ target }) => {
    // const { quantity } = this.state;
    const { name } = target;
    if (name === 'add-button') {
      this.setState((prevState) => ({
        quantity: prevState.quantity + 1,
      }));
    }
    // if (quantity < 0) {
    //   this.setState({
    //     quantity: 0,
    //   });
    // }
    if (name === 'rem-button') {
      this.setState((prevState) => ({
        quantity: prevState.quantity - 1,
      }));
    }
  };

  render() {
    const { id, title, thumbnail, price } = this.props;
    const { quantity, disabled } = this.state;
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
          <p data-testid="shopping-cart-product-quantity">{quantity[id]?.quantity}</p>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.handleAmount }
            name="rem-button"
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

export default ProdutoCart;
