import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryText: string;
    secondaryText: string;
    border: string;
  }
}

export const darkTheme: DefaultTheme = {
  primaryText: "",
  secondaryText: "#939393",
  border: "1px solid rgba(110, 118, 125,0.5)",
};
