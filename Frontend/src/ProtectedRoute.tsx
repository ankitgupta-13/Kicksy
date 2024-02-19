import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = (element, requiredRole, ...rest) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth);
  const isAuthenticated = user.status;
  const userRole = user.role;
  return isAuthenticated && userRole === requiredRole ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
