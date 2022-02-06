import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryText: string;
    secondaryText: string;
    border: string;
    primary: string;
    secondary: string;
  }
}

export const darkTheme: DefaultTheme = {
  primaryText: "",
  primary: "#90caf9",
  secondaryText: "#939393",
  secondary: "#202327",
  border: "1px solid rgba(110, 118, 125,0.5)",
};
