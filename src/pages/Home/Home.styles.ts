import { fullHeight, fullScreenHeight } from "src/theme/baseStyles";
import styled from "styled-components";

export const HomeContainer = styled.div`
  ${fullScreenHeight};
  display: grid;
  grid-template-columns: 380px 2fr 1fr;
  min-height: 100vh;
`;

export const NavbarSection = styled.div`
  ${fullHeight}
  height: 100%;
  border-right: ${({ theme }) => theme.border};
`;
export const NavBarTest = styled.div`
  position: fixed;
`;

export const FeedSection = styled.div`
  ${fullHeight}
`;

export const SideSection = styled.div`
  ${fullHeight}
  border-left: ${({ theme }) => theme.border};
`;
