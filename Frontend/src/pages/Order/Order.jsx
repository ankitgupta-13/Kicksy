import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  acceptSellerRequest,
  banUser,
  declineSellerRequest,
  getSellerById,
  getSellerRequestById,
  getUserById,
  removeBanUser,
} from "../../api/admin.api";
import avatar from "./../../assets/avatar.jpg";
import style from "./Order.module.css";

export default function Order() {
  const user = useSelector((state) => state.auth?.userData);
  console.log(user);
  const isProfileOpen = useSelector((state) => state.auth.isOpen);
  const authStatus = useSelector((state) => state.auth.status);

  const userID = useSelector((state) => state.adminDashboard.currentUser);
  const currentSection = useSelector(
    (state) => state.adminDashboard.currentSection
  );
  const action = useSelector((state) => state.adminDashboard.previousAction);
  const [userData, setUserData] = useState({});

  const handleAcceptSellerRequest = async () => {
    const response = await acceptSellerRequest({ requestID: userID });
    console.log(response);
  };

  const handleDeclineSellerRequest = async () => {
    const response = await declineSellerRequest({ requestID: userID });
    console.log(response);
  };

  const handleBanSeller = async () => {};

  const handleBanUser = async () => {
    let response;
    userData?.status === "active"
      ? (response = await banUser({ userID }))
      : (response = await removeBanUser({ userID }));
    console.log(response);
  };

  useEffect(() => {
    (async () => {
      let response;
      currentSection === "User"
        ? (response = await getUserById({ userID }))
        : action === "List"
        ? (response = await getSellerById({ sellerID: userID }))
        : (response = await getSellerRequestById({ requestID: userID }));
      if (response.statusCode === 200) {
        setUserData(response.data);
      }
    })();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.detailsection}>
        <div className={style.imagesection}>
          <div className={style.imagecircle}>
            <img src={avatar} className={style.avatar} />
          </div>
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
      <div className={style.orderhistory}>
        <span className={style.heading}>Order history</span>
      </div>
      {userData.role === "user" ? (
        <div className={style.orderhistory}>
          <span className={style.heading}>Order history</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
