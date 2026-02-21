import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const ProtectedRoutes = ({ role }) => {
  const { user, isLoggedIn } = useAuthStore();

  if (!isLoggedIn || !user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;