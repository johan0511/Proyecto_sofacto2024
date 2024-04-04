import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canActivate, RedirectPath = "/" }) => {
  if (!canActivate) {
    return <Navigate to={RedirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
