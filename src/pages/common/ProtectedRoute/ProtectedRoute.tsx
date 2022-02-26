import { Navigate, Outlet } from "react-router-dom";
import ROUTES from "src/Router/routes";

interface PROPS {
  isAuthenticated: boolean;
  children?: React.ReactElement;
}

const ProtectedRoute: React.FC<PROPS> = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
