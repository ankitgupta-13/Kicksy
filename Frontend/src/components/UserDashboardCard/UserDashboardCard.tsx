import { useDispatch } from "react-redux";
import style from "./UserDashboardCard.module.css";
import {
  selectAdminAction,
  selectAdminUser,
} from "../../redux/reducers/adminDashboardSlice";

const UserDashboardCard = ({ data }) => {
  const { username, email, role, status, mobile, _id } = data;
  const dispatch = useDispatch();
  const handleShowUser = () => {
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
      <div className={style.nameEmail}>
        <div className={style.username}>{username}</div>
        <div className={style.email}>{email}</div>
      </div>
      <div className={style.phone}>{mobile.number}</div>
      <div className={style.role}>{role}</div>
      <div className={style.status}>Active</div>
    </div>
  );
};

export default UserDashboardCard;
