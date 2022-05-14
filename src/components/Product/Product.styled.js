import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  display: flex;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SearchInput = styled.input`
  margin-right: 1em;
  font-size: 20px;
  width: 30%;
`;

export const SearchButton = styled.button`
  cursor: pointer;
`;

export const CartContainer = styled.div`
  position: absolute;
  left: 90%;
  display: flex;
  align-items: center;
`;

export const CartCounter = styled.p`
  position: absolute;
  margin-left: 25px;
  margin-bottom: 40px;
  color: black;
`;

export const CartIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const HomeMensage = styled.p`
  text-align: center;
`;

export const CategoriesContainer = styled.nav`
  width: 250px;
`;

export const CategorieButton = styled.button`
  width: 100%;
  cursor: pointer;
`;

export const PageContainer = styled.div`
  display: flex;
`;

export const ProductContainer = styled.div`
  width: 80%;
  display: flex;
  margin-left: 1em;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 400px;
  margin-bottom: 10px;
`;

export const ProductThumbnail = styled.img`
  width: 100px;
  height: 100px;
`;
