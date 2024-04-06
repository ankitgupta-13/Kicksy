import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components";
import { RootState } from "../../../../redux/store/store";
import { UserDataType } from "../../../../types/auth.types";
import style from "./UserProfile.module.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const userData: UserDataType = useSelector(
    (state: RootState) => state.auth.userData
  )!;
  return (
    <div>
      <div className={style.userDetails}></div>
      <div className={style.name}>{userData.username}</div>
      <div className={style.mobile}>{userData.mobile.number}</div>
      <div className={style.email}>{userData.email}</div>
      <div className={style.email}>
        {`${userData.status} User`.toUpperCase()}
      </div>
      <div className={style.order}>
        <Button onClick={() => navigate("/orders")}> Your Orders</Button>
      </div>
    </div>
  );
};

export default UserProfile;
