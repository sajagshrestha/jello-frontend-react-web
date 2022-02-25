import styled, { css } from "styled-components";

export const fullScreenHeight = css`
  height: 100vh;
`;

export const fullHeight = css`
  height: 100%;
`;

interface FLEX_ROW {
  gap?: string;
}

export const FlexRow = styled.div<FLEX_ROW>`
  display: flex;
  gap: ${(props) => props.gap || "1rem"};
`;
