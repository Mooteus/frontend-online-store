import styled from 'styled-components';
import { yellow, white, lightGrey2, lightGrey } from '../../utils/colors';

export const Header = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  background-color: ${yellow};
`;

export const SearchContainer = styled.div`
  display: flex;
  margin-top: 5px;
  box-shadow: 0px 3px 2px ${lightGrey2};
  height: 40px;
  width: 50%;
`;

export const SearchSelect = styled.select`
  font-size: 15px;
  height: 42px;
  border: none;
  padding-left: 10px;
  background-color: ${white};
  color: ${lightGrey2};
  border-right: 1px solid ${lightGrey};
`;

export const SearchInput = styled.input`
  font-size: 15px;
  width: 100%;
  height: 40px;
  border: none;
  outline:  none;
  padding-left: 15px;

  ::placeholder {
    color: ${lightGrey2};
  };
`;

export const SearchButton = styled.button`
  cursor: pointer;
  height: 42px;
  border: 0px;
  font-size: 20px;
  background-color: ${white};
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
