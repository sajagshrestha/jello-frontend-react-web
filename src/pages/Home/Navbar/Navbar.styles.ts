import styled from "styled-components";
const navWidth = "220px";
export const NavbarContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.5rem 4rem 2rem 0;
`;

export const NavlinksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  font-size: 1.2rem;
  align-items: flex-start;
  width: ${navWidth};
  padding-left: 1.5rem;
`;

export const UserInfoContainer = styled.div`
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: ${navWidth};
  cursor: pointer;
`;

export const Username = styled.h2`
  margin-top: 0.7rem;
`;

export const LogoContainer = styled.div`
  width: ${navWidth};
  padding-left: 0.5rem;
  padding-bottom: 2rem;
  margin-top: 0.5rem;
`;
