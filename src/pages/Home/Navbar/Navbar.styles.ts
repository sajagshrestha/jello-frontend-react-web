import styled from "styled-components";

export const NavbarContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 5rem;
`;

export const NavlinksContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 4rem;
  width: 100%;
  font-size: 1.2rem;
`;

export const UserInfoContainer = styled.div`
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const Username = styled.h2`
  margin-top: 0.7rem;
`;
