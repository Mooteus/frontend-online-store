import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProductCardDiv, ProductImg } from './ProductCard.styled';

class ProductCard extends Component {
  render() {
    const { product, addCart, qualityImage } = this.props;
    const { id, thumbnail, title, price, shipping } = product;
    return (
      <ProductCardDiv data-testid="product">
        <ProductImg
          src={ qualityImage(thumbnail) }
          alt={ title }
        />
        <h4>{title}</h4>
        <h4>
          { `R$: ${price}`}
        </h4>
        {shipping ? (
          <p data-testid="free-shipping">Frete Gratis</p>
        ) : null}
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          Mais detalhes
        </Link>
        <button
          type="button"
          id={ id }
          data-testid="product-add-to-cart"
          onClick={ () => addCart(product) }
        >
          Adicionar ao carrinho
        </button>
      </ProductCardDiv>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  addCart: PropTypes.func.isRequired,
  qualityImage: PropTypes.func.isRequired,
};

export default ProductCard;
