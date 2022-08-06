import { Route, Routes } from "react-router-dom";
import ROUTES from "src/Router/routes";
import Feed from "./Feed";
import {
  FeedSection,
  FixedPosition,
  HomeContainer,
  NavbarSection,
  SideSection,
} from "./Home.styles";
import Navbar from "./Navbar";
import Popular from "./Popular";
import Profile from "./Profile";
import Upload from "./Upload";
import SavedImage from "./SavedImage";
import SearchBar from "./SearchBar";
import Search from "./Search";
import Post from "./Post";

import Edit from "./Edit";
import PopularTags from "./PopularTags";
import PostsByTag from "./PostsByTags";
import Notifications from "./Notifications";

function Home() {
  return (
    <HomeContainer>
      <NavbarSection>
        <FixedPosition>
          <Navbar />
        </FixedPosition>
      </NavbarSection>
      <FeedSection>
        <Routes>
          <Route path="" element={<Feed />} />
          <Route path={ROUTES.UPLOAD} element={<Upload />} />
          <Route path={ROUTES.EXPLORE} element={<Popular />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SAVED_IMAGE} element={<SavedImage />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.POST} element={<Post />} />
          <Route path={ROUTES.EDIT} element={<Edit />} />
          <Route path={ROUTES.TAG} element={<PostsByTag />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
        </Routes>
      </FeedSection>
      <SideSection>
        <FixedPosition>
          <SearchBar />
          <PopularTags />
        </FixedPosition>
      </SideSection>
    </HomeContainer>
  );
}

export default Home;
