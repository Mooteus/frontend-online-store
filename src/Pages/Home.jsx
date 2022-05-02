import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.module.css';
import PropTypes from 'prop-types';
import * as api from '../services/api';

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
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const { data, valueInput, products } = this.state;
    const { addCart, cart } = this.props;
    return (
      <>
        <main>
          <input
            data-testid="query-input"
            name="valueInput"
            type="text"
            value={ valueInput }
            onChange={ this.onHandleChange }
          />
          <button type="button" data-testid="query-button" onClick={ this.search }>
            Pesquisar
          </button>
          <Link to="/cart" data-testid="shopping-cart-button">
            <img src="https://fav.farm/🛒" alt="Button Carrinho de Compras" />
            <p data-testid="shopping-cart-size">{cart.length}</p>
          </Link>

          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </main>
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
          {products.map(({ id, title, thumbnail, price }) => (
            <div key={ id } data-testid="product">
              <h3>{title}</h3>
              <img src={ thumbnail } alt={ title } />
              <h4>
                R$:
                {' '}
                {price}
              </h4>
              <Link data-testid="product-detail-link" to={ `/product/${id}` }>
                Mais detalhes
              </Link>
              <button
                type="button"
                id={ id }
                data-testid="product-add-to-cart"
                onClick={ () => addCart({ id, title, thumbnail, price }) }
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
