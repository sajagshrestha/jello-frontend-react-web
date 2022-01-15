import { Link } from "react-router-dom";
import ROUTES from "src/Router/routes";
import { NavbarContainer } from "./Navbar.styles";

function Navbar() {
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
      </ul>
    </NavbarContainer>
  );
}

export default Navbar;
