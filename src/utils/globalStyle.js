import { createGlobalStyle } from 'styled-components';
import { lightGray } from './colors';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background-color: ${lightGray}
  };
`;

export default GlobalStyle;
