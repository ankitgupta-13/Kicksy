import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = (element: any, requiredRole: any, ...rest: any[]) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth?.userData);
  console.log(user);
  const isAuthenticated = user.status;
  const userRole = user.role;
  return isAuthenticated && userRole === requiredRole ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
