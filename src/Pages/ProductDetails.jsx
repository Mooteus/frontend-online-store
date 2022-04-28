import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsById } from '../services/api';

class ProductDetails extends Component {
  state = {
    productInformation: {},
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

  render() {
    const { productInformation } = this.state;
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
            {' '}
            {price}
          </h4>
          <button
            id={ id }
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ addCart }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </>
    );
  }
}
ProductDetails.propTypes = {
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
