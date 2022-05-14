import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProductsById } from '../services/api';
import CartImage from '../img/cart-shopping-solid.svg';

const CartIcon = styled.img`
  width: 30px;
  height: 30px;
`;

class ProductDetails extends Component {
  state = {
    productInformation: {},
    inputEmail: '',
    textarea: '',
    evaluations: JSON.parse(localStorage.getItem('evaluations')) || [],
  };

  componentDidMount() {
    this.showProductDetails();
  }

  showProductDetails = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const productInformation = await getProductsById(id);
    this.setState({
      productInformation,
    });
  };

  onHandleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  saveEvaluation = () => {
    const { inputEmail, textarea, radio } = this.state;
    const evaluation = {
      inputEmail,
      textarea,
      radio,
    };
    this.setState(
      (prevState) => ({
        evaluations: [...prevState.evaluations, evaluation],
        inputEmail: '',
        textarea: '',
        radio: '',
      }),
      () => {
        const { evaluations } = this.state;
        localStorage.setItem('evaluations', JSON.stringify(evaluations));
      },
    );
  };

  render() {
    const starNumber = 5;
    const { productInformation, inputEmail, textarea, evaluations } = this.state;
    const { addCart, cart, handleProduct, handleAmount } = this.props;
    const { minProduct, maxProduct, disabledIncrease, disabledDecrease } = handleProduct;
    const { title, thumbnail, price, id, quantity } = productInformation;
    const totalProducts = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
      <>
        <Link to="/">
          <button type="button">Inicio</button>
        </Link>
        <Link to="/cart" data-testid="shopping-cart-button">
          <CartIcon src={ CartImage } alt="Button Carrinho de Compras" />
          <p>{totalProducts}</p>
        </Link>
        <div>
          <h3>{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <h4>
            R$:
            {price}
          </h4>
        </div>

        <div>
          <button
            type="button"
            onClick={ (event) => {
              handleAmount(productInformation, event);
            } }
            name="add-button"
            disabled={ disabledIncrease }
          >
            +
          </button>

          <p>{quantity}</p>
          <button
            type="button"
            onClick={ (event) => {
              handleAmount(productInformation, event);
            } }
            name="rem-button"
            disabled={ disabledDecrease }
          >
            -
          </button>
          {minProduct && <p>A quantidade de produtos não pode ser menor que zero</p>}
          {maxProduct && <p>A quantidade maxima em estoque foi atingida</p>}
        </div>
        <button
          id={ id }
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addCart(productInformation) }
        >
          Adicionar ao carrinho
        </button>

        <div>
          <h2>Avaliações</h2>
          <form>
            <label htmlFor="inputEmail">
              <input
                type="email"
                name="inputEmail"
                value={ inputEmail }
                data-testid="product-detail-email"
                placeholder="Email"
                onChange={ this.onHandleChange }
              />
              {[...Array(starNumber)].map((_, radio) => {
                radio += 1;
                return (
                  <button type="button" key={ radio } onChange={ this.onHandleChange }>
                    <input
                      data-testid={ `${radio}-rating` }
                      type="radio"
                      name="radio"
                      value={ radio }
                    />
                  </button>
                );
              })}
            </label>
            <textarea
              name="textarea"
              data-testid="product-detail-evaluation"
              onChange={ this.onHandleChange }
              value={ textarea }
            />
          </form>
          <button
            id={ id }
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.saveEvaluation }
          >
            Avaliar
          </button>
        </div>
        {evaluations.length > 0 ? (
          evaluations.map((evaluation, i) => (
            <div key={ i }>
              <p>{evaluation.inputEmail}</p>
              {evaluation.textarea}
              <p>{evaluation.radio}</p>
            </div>
          ))
        ) : (
          <p>Não há comentários!!</p>
        )}
      </>
    );
  }
}

ProductDetails.propTypes = {
  addCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(Object).isRequired,
  handleAmount: PropTypes.func.isRequired,
  handleProduct: PropTypes.shape({
    disabledIncrease: PropTypes.bool.isRequired,
    minProduct: PropTypes.bool.isRequired,
    maxProduct: PropTypes.bool.isRequired,
    disabledDecrease: PropTypes.bool.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetails;
