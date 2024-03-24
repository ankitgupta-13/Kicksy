import { useDispatch, useSelector } from "react-redux";
import style from "./UserDashboardCard.module.css";
import {
  selectAdminAction,
  selectAdminUser,
} from "../../redux/reducers/adminDashboardSlice";
import { RootState } from "../../redux/store/store";
import avatar from "../../assets/avatar.jpg";

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
          <div className={style.text}>{email}</div>
          <div className={style.text}>{status?.toUpperCase()}</div>
        </div>
      ) : (
        <div className={style.cardContainer}>
          <div className={style.text}>
            <img src={data.storeLogo} alt="" className={style.storeLogo} />
            <div className={style.store}>{data.storeName}</div>
          </div>
          <div className={style.text}>{data.userID?.username}</div>
          <div className={style.text}>{data.whatsappNumber}</div>
          <div className={style.text}>{data.userID?.email}</div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardCard;
