import { Input, TextField } from "@mui/material";
import styled from "styled-components";

export const SearchBarContainer = styled.div``;

export const SearchForm = styled.form`
  width: 100%;
  padding: 0.5rem;
`;

export const SearchInput = styled(TextField)`
  width: 100%;
  background-color: ${({ theme }) => theme.secondary};
`;
