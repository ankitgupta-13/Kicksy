import { useDispatch, useSelector } from "react-redux";
import style from "./UserDashboardCard.module.css";
import {
  selectAdminAction,
  selectAdminUser,
} from "../../redux/reducers/adminDashboardSlice";
import { RootState } from "../../redux/store/store";

const UserDashboardCard = ({ data }) => {
  const { username, email, role, status, mobile, _id } = data;
  const currentSection = useSelector(
    (state: RootState) => state.adminDashboard.currentSection
  );
  const dispatch = useDispatch();
  const handleShowUser = () => {
    console.log(data);
    dispatch(selectAdminUser(_id)),
      dispatch(
        selectAdminAction({
          selectedSection: "User",
          selectedAction: "Details",
        })
      );
  };
  return (
    <div className={style.cardContainer} onClick={handleShowUser}>
      {currentSection === "User" ? (
        <div className={style.cardContainer}>
          <div className={style.username}>{username}</div>
          <div className={style.phone}>{mobile.number}</div>
          <div className={style.email}>{email}</div>
          <div className={style.status}>{status?.toUpperCase()}</div>
        </div>
      ) : (
        <div className={style.cardContainer}>
          <div className={style.username}>{data.userID?.username}</div>
          <div className={style.phone}>{data.whatsappNumber}</div>
          <div className={style.store}>
            <div className={style.storeName}>{data.storeName}</div>
            <img src={data.storeLogo} alt="" className={style.storeLogo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardCard;
