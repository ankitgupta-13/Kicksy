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
} from "../../../../../api/admin.api.js";
import avatar from "./../../../../../assets/avatar.jpg";
import style from "./DetailUser.module.css";

const DetailUser = () => {
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
    <div>
      <div className={style.content} style={{ height: "100vh" }}>
        {currentSection === "User" ? (
          <div className={style.container}>
            <div className={style.imagesection}>
              <div className={style.imagecircle}>
                <img src={avatar} className={style.avatar} />
              </div>
              <div className={style.buttonsection}>
                <button
                  className={style.activebutton}
                  onClick={handleAcceptSellerRequest}
                >
                  {userData?.status?.toUpperCase()}
                </button>
                <button className={style.banbutton} onClick={handleBanUser}>
                  {userData.status === "active" ? "Ban User" : "Activate User"}
                </button>
              </div>
            </div>
            <div className={style.detailsection}>
              <span className={style.heading}>User Details</span>
              <span className={style.subheading}>
                Name : {userData?.username}
              </span>
              <span className={style.subheading}>
                Email : {userData?.email}
              </span>
              <span className={style.subheading}>
                Mobile :{userData?.mobile?.countryCode}
                {userData?.mobile?.number}
              </span>
              {/* <span className={style.subheading}>Address : {address}</span>
            <span className={style.subheading}>State : {address}</span>
            <span className={style.subheading}> City : {address}</span>
            <span className={style.subheading}> Zip/Pincode : {address}</span> */}
            </div>
          </div>
        ) : action === "List" ? (
          <div className={style.container} style={{ height: "180vh" }}>
            <div className={style.imagesection}>
              <div className={style.imagecircle}>
                <img src={userData.storeLogo} className={style.avatar} />
              </div>
              <div
                className={style.buttonsection}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <button
                  className={style.activebutton}
                  onClick={handleAcceptSellerRequest}
                  style={{ color: "green" }}
                >
                  Active Seller
                </button>
                <button className={style.banbutton} onClick={handleBanSeller}>
                  BanSeller
                </button>
              </div>
            </div>
            <div className={style.detailsection}>
              <span className={style.heading}>Seller Deatils</span>
              <span className={style.subheading}>
                Store Name : {userData?.storeName}
              </span>
              <span className={style.subheading}>
                GST Number : {userData?.gstNumber}
              </span>
              <span className={style.subheading}>
                Whatsapp : {userData?.whatsappNumber}
              </span>
              <span className={style.subheading}>
                {" "}
                Address : {userData?.storeAddress?.street}
              </span>
              <span className={style.subheading}>
                {" "}
                State : {userData?.storeAddress?.state.toUpperCase()}
              </span>
              <span className={style.subheading}>
                {" "}
                City : {userData?.storeAddress?.city.toUpperCase()}
              </span>
              <span className={style.subheading}>
                {" "}
                Zip/Pincode : {userData?.storeAddress?.pincode}
              </span>
            </div>
            <div className={style.orderhistory}>
              <span className={style.heading}>Sale history</span>
            </div>
          </div>
        ) : (
          <div className={style.container} style={{ height: "100vh" }}>
            <div className={style.imagesection}>
              <div className={style.imagecircle}>
                <img src={userData.storeLogo} className={style.avatar} />
              </div>

              <div className={style.buttonsection}>
                <button
                  className={style.activebutton}
                  onClick={handleAcceptSellerRequest}
                  style={{ color: "green" }}
                >
                  Accept
                </button>
                <button
                  className={style.banbutton}
                  onClick={handleDeclineSellerRequest}
                >
                  Decline
                </button>
              </div>
            </div>
            <div className={style.detailsection}>
              <span className={style.heading}>Seller Deatils</span>
              <span className={style.subheading}>
                Store Name : {userData?.storeName}
              </span>
              <span className={style.subheading}>
                GST Number : {userData?.gstNumber}
              </span>
              <span className={style.subheading}>
                Whatsapp : {userData?.whatsappNumber}
              </span>
              <span className={style.subheading}>
                {" "}
                Address : {userData?.storeAddress?.street}
              </span>
              <span className={style.subheading}>
                {" "}
                State : {userData?.storeAddress?.state.toUpperCase()}
              </span>
              <span className={style.subheading}>
                {" "}
                City : {userData?.storeAddress?.city.toUpperCase()}
              </span>
              <span className={style.subheading}>
                {" "}
                Zip/Pincode : {userData?.storeAddress?.pincode}
              </span>
            </div>
          </div>
        )}
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
};

export default DetailUser;
