import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../../services/api';

import CartImage from './img/cart-shopping-solid.svg';
import * as styled from './Home.styled';

class Home extends Component {
  state = {
    data: [],
    valueInput: '',
    products: [],
    categoryId: '',
    cart: [],
  };

  async componentDidMount() {
    const data = await api.getCategories();
    this.setState({
      data,
    });
  }

  onHandleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  search = async () => {
    const { valueInput, categoryId } = this.state;
    const data = await api.getProductsFromCategoryAndQuery(categoryId, valueInput);
    const products = data.results;
    this.setState({
      products,
      valueInput: '',
    });
  };

  selectCategory = ({ target }) => {
    const { id } = target;
    this.setState(
      {
        categoryId: id,
      },
      this.search,
    );
  };

  saveStorage = () => {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const { data, valueInput, products } = this.state;
    const { addCart, cart } = this.props;
    return (
      <>
        <styled.Header>
          <styled.SearchContainer>
            <styled.SearchInput
              data-testid="query-input"
              name="valueInput"
              type="text"
              value={ valueInput }
              onChange={ this.onHandleChange }
            />
            <styled.SearchButton
              type="button"
              data-testid="query-button"
              onClick={ this.search }
            >
              Pesquisar
            </styled.SearchButton>
          </styled.SearchContainer>
          <styled.CartContainer>
            <Link to="/cart" data-testid="shopping-cart-button">
              <styled.CartIcon src={ CartImage } alt="Button Carrinho de Compras" />
            </Link>
            <styled.CartCounter
              data-testid="shopping-cart-size"
            >
              {cart.length}
            </styled.CartCounter>
          </styled.CartContainer>
        </styled.Header>
        <styled.HomeMensage data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </styled.HomeMensage>
        <nav>
          {data.map(({ name, id }) => (
            <button
              key={ id }
              type="button"
              id={ id }
              data-testid="category"
              onClick={ this.selectCategory }
            >
              {name}
            </button>
          ))}
        </nav>
        <div>
          {products.map((product) => (
            <div key={ product.id } data-testid="product">
              <h3>{product.title}</h3>
              <img src={ product.thumbnail } alt={ product.title } />
              <h4>
                R$:
                {' '}
                {product.price}
              </h4>
              {product.shipping.free_shipping ? (
                <p data-testid="free-shipping">Frete Gratis</p>
              ) : null}
              <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
                Mais detalhes
              </Link>
              <button
                type="button"
                id={ product.id }
                data-testid="product-add-to-cart"
                onClick={ () => addCart(product) }
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

Home.propTypes = {
  addCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(Object).isRequired,
};

export default Home;
