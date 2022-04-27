import React, { Component } from 'react';

class Cart extends Component {
  state = {
    productsCart: [],
    loading: true,
  };

  componentDidMount() {
    this.loading();
  }

  loading = () => {
    const product = JSON.parse(localStorage.getItem('cart'));
    if (product) {
      this.setState({
        productsCart: product,
        loading: false,
      });
    }
  };

  render() {
    const { productsCart, loading } = this.state;
    console.log(productsCart);
    return (
      <main>
        {loading ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          productsCart.map(({ id, title, thumbnail, price }) => (
            <div key={ id }>
              <h3 data-testid="shopping-cart-product-name">{title}</h3>
              <img src={ thumbnail } alt={ title } />
              <h4>
                R$:
                {' '}
                {price}
              </h4>
              <p data-testid="shopping-cart-product-quantity">1</p>
            </div>
          ))
        )}
      </main>
    );
  }
}

export default Cart;
