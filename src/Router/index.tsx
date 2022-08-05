import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "src/pages/common/PageNotFound/PageNotFound";
import ProtectedRoute from "src/pages/common/ProtectedRoute/ProtectedRoute";
import { RootState } from "src/redux";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ROUTES from "./routes";

export default function JelloRouter() {
  const { id } = useSelector((state: RootState) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={!!id} />}>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
