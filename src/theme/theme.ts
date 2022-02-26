import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    Pallete: any;
    Components: any;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    pallete?: any;
    component?: any;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterDelay: 900,
        placement: "bottom",
        arrow: true,
      },
    },
    MuiAvatar: {
      defaultProps: {
        sx: { width: 36, height: 36, cursor: "pointer" },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

export default darkTheme;
