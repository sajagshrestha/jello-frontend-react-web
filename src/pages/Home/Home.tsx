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
import Popular from "./Popular";
import Profile from "./Profile";
import Upload from "./Upload";
import SavedImage from "./SavedImage";
import SearchBar from "./SearchBar";
import Search from "./Search";
import Post from "./Post";
import ProtectedRoute from "../common/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "src/redux";

function Home() {
  return (
    <HomeContainer>
      <NavbarSection>
        <Navbar />
      </NavbarSection>
      <FeedSection>
        <SearchBar />
        <Routes>
          <Route path="" element={<Feed />} />
          <Route path={ROUTES.UPLOAD} element={<Upload />} />
          <Route path={ROUTES.EXPLORE} element={<Popular />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.SAVED_IMAGE} element={<SavedImage />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.POST} element={<Post />} />
        </Routes>
      </FeedSection>
      <SideSection>side</SideSection>
    </HomeContainer>
  );
}

export default Home;
