import { Avatar, Badge, Button, Link as MuiLink } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import StyledLink from "src/pages/common/jello-styled-components/StyledLink";
import { RootState, useAppDispatch } from "src/redux";
import { logout } from "src/redux/slices/auth-slice";
import ROUTES from "src/Router/routes";
import { getAvatar } from "src/utils/avatar";
import { interpolate } from "src/utils/string";
import {
  LogoContainer,
  NavbarContainer,
  NavlinksContainer,
  UserInfoContainer,
  Username,
} from "./Navbar.styles";
import NavbarLink from "./NavbarLink";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Logo from "src/pages/common/Logo/Logo";
import notificationService from "src/api/services/notification-service";
import { useQuery } from "react-query";

function Navbar() {
  const { id, username } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery(
    "Notifications",
    notificationService.getNotifications
  );

  const onLogoutClick = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <NavbarContainer>
      <NavlinksContainer>
        <li>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </li>
        <li>
          <NavbarLink
            to={ROUTES.BASE}
            icon={<HomeOutlinedIcon />}
            linkText={"Home"}
          />
        </li>
        <li>
          <NavbarLink
            to={ROUTES.EXPLORE}
            icon={<ExploreOutlinedIcon />}
            linkText={"Explore"}
          />
        </li>
        <li>
          <NavbarLink
            to={ROUTES.NOTIFICATIONS}
            icon={<ExploreOutlinedIcon />}
            linkText={"Notifications"}
            badgeCount={data?.unreadCount}
          />
        </li>
        <li>
          <NavbarLink
            to={ROUTES.SAVED_IMAGE}
            icon={<BookmarkBorderOutlinedIcon />}
            linkText={"Saved"}
          />
        </li>
        <li>
          <NavbarLink
            to={ROUTES.UPLOAD}
            icon={<CloudUploadOutlinedIcon />}
            linkText={"Upload"}
          />
        </li>
        <li>
          <NavbarLink
            to={interpolate(ROUTES.PROFILE, { id })}
            icon={<PermIdentityOutlinedIcon />}
            linkText={"Profile"}
          />
        </li>
        <li>
          <NavbarLink
            to={ROUTES.LOGIN}
            icon={<LogoutOutlinedIcon />}
            linkText={"Logout"}
            onClick={onLogoutClick}
          />
        </li>
      </NavlinksContainer>
      <UserInfoContainer
        onClick={() => navigate(interpolate(ROUTES.PROFILE, { id }))}
      >
        <Avatar src={getAvatar(id)} sx={{ width: 64, height: 64 }} />
        <Username>{username}</Username>
      </UserInfoContainer>
    </NavbarContainer>
  );
}

export default Navbar;
