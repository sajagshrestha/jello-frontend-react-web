import { ReactElement } from "react";
import StyledLink from "src/pages/common/jello-styled-components/StyledLink";

interface PROPS {
  icon: ReactElement;
  linkText: string;
  to: string;
  onClick?: () => void;
}

const NavbarLink: React.FC<PROPS> = ({ icon, linkText, to, onClick }) => {
  return (
    <StyledLink to={to} onClick={onClick && onClick}>
      {icon}
      {linkText}
    </StyledLink>
  );
};
export default NavbarLink;
