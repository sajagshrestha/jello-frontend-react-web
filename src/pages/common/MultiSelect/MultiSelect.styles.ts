import AsyncCreatableSelect from "react-select/async-creatable";
import styled from "styled-components";

export const MultiSelectContainer = styled.div`
  color: black;
  width: 100%;
`;

export const CustomAsyncCreatableSelect = styled(AsyncCreatableSelect)`
  .Select__control {
    background-color: ${(props) => props.theme.textFieldFill};
    border: none;
    box-shadow: none;
    min-width: 250px;
  }

  .Select__input {
    color: ${(props) => props.theme.whiteText};
  }
  .Select__input-container {
    color: ${(props) => props.theme.whiteText};
  }
  .Select__single-value {
    color: ${(props) => props.theme.whiteText};
  }
  .Select__indicator-separator {
    opacity: 0;
  }
  .Select__option {
    color: ${(props) => props.theme.whiteText};
    border: none;
    background: ${(props) => props.theme.textFieldFill};
    &:hover {
      background-color: ${(props) => props.theme.selectHover};
    }
  }
  .Select__multi-value {
    color: ${(props) => props.theme.selectBackground};
    border: none;
    background-color: ${(props) => props.theme.primary};
    &:hover {
      background-color: ${(props) => props.theme.primary};
    }
  }
  .Select__multi-value__remove {
    &:hover {
      background-color: ${(props) => props.theme.primary};
      color: ${(props) => props.theme.selectBackground};
    }
  }
  .Select__menu {
    background-color: ${(props) => props.theme.textFieldFill};
  }
  .Select__menu-list {
    height: 200px;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.textFieldFill};
    }
    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.selectHover};
    }
  }
`;
