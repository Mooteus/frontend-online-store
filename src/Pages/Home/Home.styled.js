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
