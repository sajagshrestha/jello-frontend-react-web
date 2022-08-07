import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: ${({ theme }) => theme.primary};
  font-size: 1.4rem;
`;

export default StyledLink;
