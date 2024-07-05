import { ArrowBackIos } from "@mui/icons-material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderHistory } from "../../../../api/user.api.js";
import avatar from "../../../../assets/avatar.jpg";
import profileCover from "../../../../assets/profile-cover.png";
import { Button, LogoutBtn } from "../../../../components/index.js";
import OrderDashboardCard from "../../../../components/OrderDashboardCard/OrderDashboardCard.jsx";
import style from "./UserProfile.module.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.userData);
  const isProfileOpen = useSelector((state) => state.auth.isOpen);
  const authStatus = useSelector((state) => state.auth.status);

  const [orders, setOrders] = useState([]);
  const userID = useSelector((state) => state.auth.userData?._id);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrderHistory({ userID: String(userID) });
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div className={style.container}>
      <div
        className={style.cover}
        style={{ backgroundImage: `url(${profileCover})` }}
      >
        <div className={style.cover_top}>
          <Button
            className={style.backButton}
            style={{ backgroundColor: "transparent" }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIos />
          </Button>
          <button
            className={style.searchButton}
            style={{ backgroundColor: "transparent" }}
          >
            <SearchOutlinedIcon />
          </button>
        </div>
      </div>

      <div>
        <div
          id=""
          className={`${style.sidenav} ${authStatus ? style.open : ""}`}
          style={{ opacity: isProfileOpen ? 1 : 1 }}
        >
          <div className={style.detailsection}>
            <div className={style.imagesection}>
              <div className={style.imagecircle}></div>
              <img src={avatar} className={style.avatar} />
              <div className={style.detail}>
                <h4 className={style.status}>
                  {user?.status} {user?.role}
                </h4>
                <span className={style.subheading}>
                  Name : {user?.username}
                </span>
                <span className={style.subheading}>Email : {user?.email}</span>
                {/* <span className={style.subheading}>Mobile : {mobile}</span> */}
              </div>
            </div>
          </div>
          <div className={style.logoutbutton}>
            <LogoutBtn wid={"90%"} />
          </div>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <div className={style.head}>
            <h2>Your Orders</h2>
          </div>
          <div>
            {orders?.map((order) => {
              return (
                <div key={order._id}>
                  <OrderDashboardCard order={order} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
