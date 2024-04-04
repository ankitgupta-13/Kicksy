import { useDispatch, useSelector } from "react-redux";
import style from "./UserDashboardCard.module.css";
import {
  selectAdminAction,
  selectAdminUser,
} from "../../redux/reducers/adminDashboardSlice";
import { RootState } from "../../redux/store/store";
import avatar from "../../assets/avatar.jpg";
import MediaQuery from "react-responsive";

const UserDashboardCard = ({ data, type }) => {
  const { username, email, status, mobile, _id } = data;
  const currentSection = useSelector(
    (state: RootState) => state.adminDashboard.currentSection
  );
  const currentAction = useSelector(
    (state: RootState) => state.adminDashboard.currentAction
  );
  const dispatch = useDispatch();
  const handleShowUser = () => {
    dispatch(selectAdminUser(_id)),
      dispatch(
        selectAdminAction({
          selectedSection: currentSection === "User" ? "User" : "Seller",
          selectedAction: "Details",
          previousAction: type,
        })
      );
  };
  return (
    <div className={style.Container} onClick={handleShowUser}>
      {currentSection === "User" ? (
        <div className={style.cardContainer}>
          <div className={style.text}>
            <img src={avatar} alt="" className={style.storeLogo} />
            <div className={style.store}>{username}</div>
          </div>
          <div className={style.text}>{mobile.number}</div>

          <MediaQuery minWidth={431}>
            <div className={`${style.text} ${style.emailText}`}>{email}</div>
          </MediaQuery>

          <div className={style.text}>
            <div className={style.text} style={{ width: "10px", height: "10px", backgroundColor: "green", borderRadius: "50%", marginRight: "5px" }}></div>
            {status?.toUpperCase()}
          </div>
        </div>
      ) : (
        <div className={style.cardContainer}>
          <div className={style.text}>
            <img src={data.storeLogo} alt="" className={style.storeLogo} />
            <div className={style.store}>{data.storeName}</div>
          </div>
          <div className={style.text}>{data.userID?.username}</div>
          <div className={style.text}>{data.whatsappNumber}</div>
          <MediaQuery minWidth={431}>
            <div className={`${style.text} ${style.emailText}`}>{data.userID?.email}</div>
          </MediaQuery>
        </div>
      )}
    </div>
  );
};

export default UserDashboardCard;
