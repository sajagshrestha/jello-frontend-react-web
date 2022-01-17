import { Avatar, Button, Link as MuiLink } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StyledLink from "src/pages/common/jello-styled-components/StyledLink";
import { RootState, useAppDispatch } from "src/redux";
import { logout } from "src/redux/slices/auth-slice";
import ROUTES from "src/Router/routes";
import { getAvatar } from "src/utils/avatar";
import { interpolate } from "src/utils/string";
import {
  NavbarContainer,
  NavlinksContainer,
  UserInfoContainer,
  Username,
} from "./Navbar.styles";

function Navbar() {
  const { id, username } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogoutClick = () => {
    dispatch(logout);
    navigate(ROUTES.LOGIN);
  };

  return (
    <NavbarContainer>
      <NavlinksContainer>
        <li>
          <StyledLink to={ROUTES.UPLOAD}>Upload</StyledLink>
        </li>
        <li>
          <StyledLink to={ROUTES.BASE}>Feed</StyledLink>
        </li>
        <li>
          <StyledLink to={ROUTES.EXPLORE}>Explore</StyledLink>
        </li>
        <li>
          <StyledLink to={ROUTES.SAVED_IMAGE}>Saved Image</StyledLink>
        </li>
        <li>
          <MuiLink href={interpolate(ROUTES.PROFILE, { id })}>Profile</MuiLink>
        </li>
        <li>
          <Button onClick={onLogoutClick}>Logout</Button>
        </li>
      </NavlinksContainer>
      <UserInfoContainer>
        <Avatar src={getAvatar(id)} sx={{ width: 64, height: 64 }} />
        <Username>{username}</Username>
      </UserInfoContainer>
    </NavbarContainer>
  );
}

export default Navbar;
function useDispatch() {
  throw new Error("Function not implemented.");
}
