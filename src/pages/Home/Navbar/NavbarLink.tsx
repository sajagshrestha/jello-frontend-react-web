import { Badge } from "@mui/material";
import { ReactElement } from "react";
import StyledLink from "src/pages/common/jello-styled-components/StyledLink";

interface PROPS {
  icon: ReactElement;
  linkText: string;
  to: string;
  onClick?: () => void;
  badgeCount?: number;
}

const NavbarLink: React.FC<PROPS> = ({
  icon,
  linkText,
  to,
  onClick,
  badgeCount,
}) => {
  return (
    <StyledLink to={to} onClick={onClick && onClick}>
      {icon}
      {linkText}
      {badgeCount && badgeCount > 0 ? (
        <Badge badgeContent={badgeCount} color="error">
          {""}
        </Badge>
      ) : null}
    </StyledLink>
  );
};
export default NavbarLink;
