import { useDispatch, useSelector } from "react-redux";
import { toggleProfileVisibility } from "../../redux/reducers/authSlice";
import style from "./Profile.module.css";
import avatar from "./../../assets/avatar.jpg";
import { Button, LogoutBtn } from "..";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileStatus = useSelector((state: RootState) => state.auth.isOpen);
  const user = useSelector((state: RootState) => state.auth?.userData);
  const isProfileOpen = useSelector((state: RootState) => state.auth.isOpen);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  const handleToggleProfileVisibility = () => {
    dispatch(toggleProfileVisibility());
  };

  return (
    <div
      id="mySidenav"
      className={`${style.sidenav} ${
        isProfileOpen && authStatus ? style.open : ""
      }`}
      style={{ opacity: isProfileOpen ? 1 : 0 }}
    >
      <div className={style.head}>
        <h2>Profile</h2>
        <a
          className={style.closebtn}
          onClick={() => profileStatus && handleToggleProfileVisibility}
        >
          &times;
        </a>
      </div>
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
      <div className={style.logoutbutton}>
        <Button className={style.dashboardBtn} onClick={() => navigate("/dashboard")} style={{backgroundColor: '#666', width: "17.8rem", height:'40px', color: 'white', borderRadius: '10px', border: 'none', cursor: "pointer"}}>
          {user?.role === "user" ? "My Profile" : "Dashboard"}{" "}
        </Button>
        <LogoutBtn wid={"95%"} />
      </div>
    </div>
  );
};

export default Profile;
