import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body{
    font-family: monospace;
    background-color: ${({ theme }) => theme.pageBg};
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  div, p, li, span, h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.primaryColor};
  }
`;
