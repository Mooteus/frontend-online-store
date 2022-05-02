import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsById } from '../services/api';

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
    const { addCart } = this.props;
    const { title, thumbnail, price, id } = productInformation;
    return (
      <>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://fav.farm/🛒" alt="Button Carrinho de Compras" />
        </Link>
        <div>
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <h4>
            R$:
            {price}
          </h4>
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
            <input
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

ProductDetails.propTypes = {
  addCart: PropTypes.func.isRequired,
};

export default ProductDetails;
