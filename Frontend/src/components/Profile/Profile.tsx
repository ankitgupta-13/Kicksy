import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileVisibility } from '../../redux/reducers/authSlice';
import style from './Profile.module.css';
import { LogoutBtn } from "..";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state : any) => state.auth?.userData);
  const isProfileOpen = useSelector((state) => state.auth.isOpen);

  const handleToggleProfileVisibility = () => {
    dispatch(toggleProfileVisibility());
  };

  return (
      <div id="mySidenav" className={`${style.sidenav} ${isProfileOpen ? style.open : ''}`}>
        <div className={style.head}>
        <h2>Profile</h2>
        <a className={style.closebtn} onClick={handleToggleProfileVisibility}>&times;</a>  
        </div>
        <div className={style.logoutbutton}>
          <LogoutBtn/>
        </div>
      </div>
  );
};

export default Profile;