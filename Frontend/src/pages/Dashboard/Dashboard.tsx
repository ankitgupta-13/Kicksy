import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import SellerDashboard from "./SellerDashboard/SellerDashboard";
import UserProfile from "./UserDashboard/UserProfile/UserProfile";

const Dashboard = () => {
  const userRole = useSelector(
    (state: RootState) => state.auth?.userData?.role
  );
  return (
    <>
      {userRole === "admin" ? (
        <AdminDashboard />
      ) : userRole === "seller" ? (
        <SellerDashboard />
      ) : userRole === "user" ? (
        <UserProfile />
      ) : null}
    </>
  );
};

export default Dashboard;
