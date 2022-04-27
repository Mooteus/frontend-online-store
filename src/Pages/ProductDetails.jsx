import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductsById } from '../services/api';

class ProductDetails extends Component {
  state = {
    data: {},
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

    const data = await getProductsById(id);
    this.setState({
      data,
    });
  };

  render() {
    const { data } = this.state;
    console.log(data);
    const { title, thumbnail, price } = data;
    return (
      <div>
        <h3 data-testid="product-detail-name">{title}</h3>
        <img src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {' '}
          {price}
        </h4>
        <button type="button" data-testid="product-detail-add-to-cart">
          Adicionar ao carrinho
        </button>
      </div>
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

export default ProductDetails;
