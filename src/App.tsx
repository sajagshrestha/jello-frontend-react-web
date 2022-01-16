import { ThemeProvider as MaterialThemeProvider } from "@mui/material";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import Snackbar from "./pages/Snackbar";
import queryClient from "./react-query/query-client";
import { store } from "./redux";
import JelloRouter from "./Router";
import GlobalStyle from "./theme/global-styles";
import { darkTheme as styledDarkTheme } from "./theme/styled-components.theme";
import muiDarkTheme from "./theme/theme";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MaterialThemeProvider theme={muiDarkTheme}>
          <StyledThemeProvider theme={styledDarkTheme}>
            <GlobalStyle />
            <JelloRouter />
            <Snackbar />
          </StyledThemeProvider>
        </MaterialThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
