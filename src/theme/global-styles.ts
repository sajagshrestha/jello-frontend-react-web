import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    display:block;
    margin: 0;
    padding: 0;
    background: #010101;
    color: white;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  #root{
    height:100%;
    min-height:100vh;
  }
`;

export default GlobalStyle;
