import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryText: string;
    secondaryText: string;
    border: string;
    primary: string;
    secondary: string;
    textFieldFill: string;
    selectBackground: string;
    selectText: string;
    selectHover: string;
    whiteText: string;
    borderDashed: string;
  }
}

export const darkTheme: DefaultTheme = {
  primaryText: "white",
  primary: "#90caf9",
  secondaryText: "#939393",
  secondary: "#202327",
  border: "1px solid rgba(110, 118, 125,0.5)",
  borderDashed: "2px dashed rgba(110, 118, 125,0.5)",
  textFieldFill: "#181818",
  selectBackground: "#15171A",
  selectText: "#6A6B6F",
  selectHover: "#202327",
  whiteText: "#FFFFFF",
};
