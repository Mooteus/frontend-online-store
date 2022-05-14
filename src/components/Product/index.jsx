import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as styled from './Product.styled';

class Product extends Component {
  render() {
    const { title, thumbnail, price, id } = this.props;
    return (
      <styled.ProductCard key={ id } data-testid="product">
        <h4>{title}</h4>
        <styled.ProductThumbnail src={ thumbnail } alt={ title } />
        <h4>
          R$:
          {' '}
          {price}
        </h4>
        {/* {product.shipping.free_shipping ? (
          <p data-testid="free-shipping">Frete Gratis</p>
        ) : null} */}
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          Mais detalhes
        </Link>
      </styled.ProductCard>
    );
  }
}

Product.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default Product;
