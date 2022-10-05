import styled from 'styled-components';
import { lightGray } from '../../utils/colors';

export const ProductCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 284px;
  height: 400px;
  margin-bottom: 10px;
  background-color: white;
`;

export const ProductImg = styled.img`
  width: 100%;
  background-color: red;
  height: 284px;
  border: 1px solid ${lightGray};
`;
