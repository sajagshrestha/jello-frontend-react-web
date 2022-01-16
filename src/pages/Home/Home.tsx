import { Route, Routes } from "react-router-dom";
import ROUTES from "src/Router/routes";
import Feed from "./Feed";
import {
  FeedSection,
  HomeContainer,
  NavbarSection,
  SideSection,
} from "./Home.styles";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Upload from "./Upload";

function Home() {
  return (
    <HomeContainer>
      <NavbarSection>
        <Navbar />
      </NavbarSection>
      <FeedSection>
        <Routes>
          <Route path="" element={<Feed />} />
          <Route path={ROUTES.UPLOAD} element={<Upload />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Routes>
      </FeedSection>
      <SideSection>side</SideSection>
    </HomeContainer>
  );
}

export default Home;
