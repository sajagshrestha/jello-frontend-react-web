import { Link as MuiLink } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "src/redux";
import ROUTES from "src/Router/routes";
import { interpolate } from "src/utils/string";
import { NavbarContainer } from "./Navbar.styles";

function Navbar() {
  const { id } = useSelector((state: RootState) => state.auth);

  return (
    <NavbarContainer>
      Navbar
      <ul>
        <li>
          <Link to={ROUTES.UPLOAD}>Upload</Link>
        </li>
        <li>
          <Link to={ROUTES.BASE}>All Posts</Link>
        </li>
        <li>
          <MuiLink href={interpolate(ROUTES.PROFILE, { id })}>Profile</MuiLink>
        </li>
      </ul>
    </NavbarContainer>
  );
}

export default Navbar;
