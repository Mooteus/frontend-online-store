import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.module.css';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const data = await getCategories();
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    console.log('data', data);
    return (
      <>
        <main>
          <label htmlFor="input">
            <input id="input" type="text" />
            <Link to="/cart" data-testid="shopping-cart-button">
              <img src="https://fav.farm/🛒" alt="Button Carrinho de Compras" />
            </Link>
          </label>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </main>
        <nav>
          <ul>
            {data.map((category) => (
              <li key={ category.id } data-testid="category">
                {category.name}
              </li>
            ))}
          </ul>
        </nav>
      </>
    );
  }
}

export default Home;
