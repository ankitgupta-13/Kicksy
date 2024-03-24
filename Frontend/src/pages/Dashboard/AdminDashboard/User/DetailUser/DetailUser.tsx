import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import {
  acceptProductRequest,
  acceptSellerRequest,
  declineSellerRequest,
  getSellerRequestById,
  getUserById,
} from "../../../../../api/admin.api";
import avatar from "./../../../../../assets/avatar.jpg";
import style from "./DetailUser.module.css";

const DetailUser = () => {
  const userID = useSelector(
    (state: RootState) => state.adminDashboard.currentUser
  );
  const currentSection = useSelector(
    (state: RootState) => state.adminDashboard.currentSection
  );
  const [userData, setUserData] = useState({});
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();

  const handleAcceptSellerRequest = async () => {
    const response = await acceptSellerRequest({ requestID: userID });
    console.log(response);
  };
  const handleDeclineSellerRequest = async () => {
    const response = await declineSellerRequest({ requestID: userID });
    console.log(response);
  };

  useEffect(() => {
    (async () => {
      let response;
      currentSection === "User"
        ? (response = await getUserById({ userID }))
        : (response = await getSellerRequestById({ requestID: userID }));
      if (response.statusCode === 200) {
        setUserData(response.data);
        setMobile(response.data.mobile.number);
        setAddress(response.data.address);
      }
    })();
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.imagesection}>
          <div className={style.imagecircle}>
            <img src={userData.storeLogo} className={style.avatar} />
          </div>
          <button
            className={style.banbutton}
            onClick={handleAcceptSellerRequest}
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
        {userData.role === "user" ? (
          <div className={style.detailsection}>
            <span className={style.heading}>User Deatils</span>
            <span className={style.subheading}>
              Name : {userData?.userID?.username}
            </span>
            <span className={style.subheading}>Email : {userData?.email}</span>
            <span className={style.subheading}>Mobile : {mobile}</span>
            <span className={style.subheading}>Store Address : {address}</span>
            <span className={style.subheading}>Store State : {address}</span>
            <span className={style.subheading}> City : {address}</span>
            <span className={style.subheading}> Zip/Pincode : {address}</span>
          </div>
        ) : (
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
        )}
      </div>
      {userData.role === "user" ? (
        <div className={style.orderhistory}>
          <span className={style.heading}>Order history</span>
        </div>
      ) : (
        <div className={style.orderhistory}>
          <span className={style.heading}>Sale history</span>
        </div>
      )}
    </div>
  );
};

export default DetailUser;
