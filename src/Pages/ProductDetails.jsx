import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  state = {
    productInformation: {},
    inputEmail: '',
    textarea: '',
    evaluations: JSON.parse(localStorage.getItem('evaluations')) || [],
    minProduct: false,
    maxProduct: false,
    disabledDecrease: false,
    disabledIncrease: false,
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
    const { cart } = this.props;
    const productInformation = cart.find((product) => product.id === id);
    console.log(productInformation);
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

  handleButton = () => {
    const { productInformation } = this.state;
    const { quantity, available_quantity: stockQuantity } = productInformation;
    if (stockQuantity === quantity) {
      this.setState({
        disabledIncrease: true,
        maxProduct: true,
      });
    } else {
      this.setState({
        disabledIncrease: false,
        maxProduct: false,
      });
    }
    if (quantity === 0) {
      this.setState({
        disabledDecrease: true,
        minProduct: true,
      });
    } else {
      this.setState({
        disabledDecrease: false,
        minProduct: false,
      });
    }
  };

  handleAmount = async ({ id, title, thumbnail, price, quantity }, { target }) => {
    const { name } = target;
    const { addCart, subCart } = this.props;
    if (name === 'add-button') {
      await addCart({ id, title, thumbnail, price, quantity });
    }
    if (name === 'rem-button') {
      await subCart({ id, title, thumbnail, price, quantity });
    }
    this.handleButton();
  };

  render() {
    const starNumber = 5;
    const {
      productInformation,
      inputEmail,
      textarea,
      evaluations,
      minProduct,
      maxProduct,
      disabledIncrease,
      disabledDecrease,
    } = this.state;
    const { addCart, cart } = this.props;
    const { title, thumbnail, price, id, quantity } = productInformation;
    const totalProducts = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    return (
      <>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://fav.farm/🛒" alt="Button Carrinho de Compras" />
          <p data-testid="shopping-cart-size">{totalProducts}</p>
        </Link>
        <div>
          <h3 data-testid="product-detail-name">{title}</h3>
          <img src={ thumbnail } alt={ title } />
          <h4>
            R$:
            {price}
          </h4>
        </div>

        <div>
          <button
            type="button"
            onClick={ (event) => this.handleAmount(productInformation, event) }
            name="add-button"
            disabled={ disabledIncrease }
          >
            +
          </button>

          <p>{quantity}</p>
          <button
            type="button"
            onClick={ (event) => this.handleAmount(productInformation, event) }
            name="rem-button"
            disabled={ disabledDecrease }
          >
            -
          </button>
          {minProduct ? (
            <p>A quantidade de produtos não pode ser menor que zero</p>
          ) : null}
          {maxProduct ? <p>A quantidade maxima em estoque foi atingida</p> : null}
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

ProductDetails.propTypes = {
  cart: PropTypes.arrayOf(Object).isRequired,
  addCart: PropTypes.func.isRequired,
  subCart: PropTypes.func.isRequired,
};

export default ProductDetails;
