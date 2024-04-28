import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIos } from "@mui/icons-material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from "react-router-dom";
import { Button, LogoutBtn } from "../../../../components";
import { RootState } from "../../../../redux/store/store";
import { UserDataType } from "../../../../types/auth.types";
import style from "./UserProfile.module.css";
import avatar from "../../../../assets/avatar.jpg";
import { useEffect, useState } from "react";
import { getOrderHistory } from "../../../../api/user.api";

import profileCover from "../../../../assets/profile-cover.png";
import OrderDashboardCard from "../../../../components/OrderDashboardCard/OrderDashboardCard.tsx";

const UserProfile = () => {
  // const navigate = useNavigate();
  const userData: UserDataType = useSelector(
    (state: RootState) => state.auth.userData
  )!;
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const profileStatus = useSelector((state: RootState) => state.auth.isOpen);
  const user = useSelector((state: RootState) => state.auth?.userData);
  const isProfileOpen = useSelector((state: RootState) => state.auth.isOpen);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  // const handleToggleProfileVisibility = () => {
  //   dispatch(toggleProfileVisibility());
  // };

  const [orders, setOrders] = useState([]);
  const userID = useSelector((state: RootState) => state.auth.userData?._id);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrderHistory({ userID });
      console.log(response.data.orders);
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.cover} style={{ backgroundImage: `url(${profileCover})` }}>
        <div className={style.cover_top}>
          <Button className={style.backButton} style={{ backgroundColor: "transparent" }} onClick={() => navigate("/")}>
            <ArrowBackIos />
          </Button>
          <button className={style.searchButton} style={{ backgroundColor: "transparent" }} >
            <SearchOutlinedIcon/>
          </button>
        </div>
      </div>

      <div>
        <div
          id=""
          className={`${style.sidenav} ${authStatus ? style.open : ""}`}
          style={{ opacity: isProfileOpen ? 1 : 1 }}
        >
          {/* <div className={style.head}>
            <h2>Profile</h2>

          </div> */}
          <div className={style.detailsection}>
            <div className={style.imagesection}>
              <div className={style.imagecircle}></div>
                <img src={avatar} className={style.avatar} />
              <div className={style.detail}>
                <h4 className={style.status}>
                  {user?.status} {user?.role}
                </h4>
                <span className={style.subheading}>Name : {user?.username}</span>
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



      <div style={{ width: "100%" }} >
        <div style={{ width: "100%" }}>
          <div className={style.head}>
            <h2>Your Orders</h2>
          </div>
          <div>
            {orders?.map((order: any) => {
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