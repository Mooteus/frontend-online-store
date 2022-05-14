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
    sorting: 'none',
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

  getProductsFromCategoryAndQuery = async () => {
    const { valueInput, categoryId, sorting } = this.state;
    const data = await api.getProductsFromCategoryAndQuery(categoryId, valueInput);
    const products = data.results;
    const sortedProducts = this.sortProducts(sorting, products);

    this.setState({
      products: sortedProducts,
      valueInput: '',
    });

    return products;
  }

  // aplica ordenação selecionada
  sortProducts = (sorting, products) => {
    const sortingFactor = this.getSortingFactor(sorting);
    if (sortingFactor !== 0) {
      return products.sort((a, b) => sortingFactor * (a.price - b.price));
      // a - b crescente, a + b descrescente
    }
    return products;
  }

  // calcula constante de ordenação
  getSortingFactor = (sorting) => {
    const none = 0;
    const asc = 1;
    const desc = -1;
    if (sorting === 'none') {
      return none;
    } if (sorting === 'asc') {
      return asc;
    }
    return desc;
  }

  setSorting = ({ target }) => {
    const sorting = target.value;
    this.setState({
      sorting,
    }, this.search);
  }

  search = async () => {
    const products = await this.getProductsFromCategoryAndQuery();
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
          <select
            onChange={ this.setSorting }
          >
            <option value="none">sem ordenação</option>
            <option value="asc">menor preço</option>
            <option value="desc">maior preço</option>
          </select>
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
        <styled.PageContainer>
          <styled.CategoriesContainer>
            {data.map(({ name, id }) => (
              <styled.CategorieButton
                key={ id }
                type="button"
                id={ id }
                data-testid="category"
                onClick={ this.selectCategory }
              >
                {name}
              </styled.CategorieButton>
            ))}
          </styled.CategoriesContainer>
          <styled.ProductContainer>
            {products.map((product) => (
              <styled.ProductCard key={ product.id } data-testid="product">
                <h4>{product.title}</h4>
                <styled.ProductThumbnail
                  src={ product.thumbnail }
                  alt={ product.title }
                />
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
              </styled.ProductCard>
            ))}
          </styled.ProductContainer>
        </styled.PageContainer>
      </>
    );
  }
}

Home.propTypes = {
  addCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(Object).isRequired,
};

export default Home;
