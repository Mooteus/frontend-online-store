import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.module.css';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    data: [],
    valueInput: '',
    products: [],
    categoryId: '',
  };

  async componentDidMount() {
    const data = await getCategories();
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
    console.log('ID', categoryId);
    console.log('value', valueInput);
    const data = await getProductsFromCategoryAndQuery(categoryId, valueInput);
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

  render() {
    const { data, valueInput, products } = this.state;
    console.log(products);
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
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
