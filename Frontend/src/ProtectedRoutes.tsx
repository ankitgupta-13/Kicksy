import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ userRole, status }) => {
  console.log(userRole, status);
  if (!status) return <Navigate to="/login" />;
  if (userRole !== "admin") return <Navigate to="/" />;
  return <Outlet />;
};

export default ProtectedRoutes;
