import React from "react";
import { authLogout } from "../../api/auth.api";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const data = await authLogout();
    if (data.status === 200) dispatch(logout());
    else console.log("Error in logout");
  };

  return <button style={{backgroundColor: 'black', width: '180px', height:'40px', color: 'white', borderRadius: '10px', border: 'none'}} onClick={handleLogout}>Logout</button>;
};

export default LogoutBtn;
