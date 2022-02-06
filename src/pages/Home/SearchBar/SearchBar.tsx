import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Input, InputAdornment } from "@mui/material";
import {
  SearchBarContainer,
  SearchForm,
  SearchInput,
} from "./SearchBar.styled";
import { useNavigate } from "react-router-dom";
import ROUTES from "src/Router/routes";
import { interpolate } from "src/utils/string";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query === "") return;

    navigate(ROUTES.SEARCH + "?query=" + query);
  };

  return (
    <SearchBarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          placeholder="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBarContainer>
  );
};

export default SearchBar;
