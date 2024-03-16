import { useDispatch } from "react-redux";
import style from "./UserAdminDashboardCard.module.css";
import {
  selectAction,
  selectUser,
} from "../../redux/reducers/adminDashboardSlice";

const UserAdminDashboardCard = ({ data }) => {
  const { username, email, role, status, mobile, _id } = data;
  const dispatch = useDispatch();
  const handleShowUser = () => {
    dispatch(selectUser(_id)),
      dispatch(
        selectAction({
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

export default UserAdminDashboardCard;
