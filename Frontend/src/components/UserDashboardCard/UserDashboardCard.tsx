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
    <div className={style.Container} onClick={handleShowUser}>
      {currentSection === "User" ? (
        <div className={style.cardContainer}>
          <div className={style.text}>{username}</div>
          <div className={style.text}>{mobile.number}</div>
          <div className={style.text}>{email}</div>
          <div className={style.text}>{status?.toUpperCase()}</div>
        </div>
      ) : (
        <div className={style.cardContainer}>
          <div className={style.store}>
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
