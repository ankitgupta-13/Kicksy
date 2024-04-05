import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import SellerDashboard from "./SellerDashboard/SellerDashboard";
import UserProfile from "./UserDashboard/UserProfile";

const Dashboard = () => {
  const userRole = useSelector((state) => state.auth?.userData?.role);
  return (
    <>
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : userRole === "seller" ? (
        <SellerDashboard />
      ) : (
        <UserProfile />
      )}
    </>
  );
};

export default Dashboard;
