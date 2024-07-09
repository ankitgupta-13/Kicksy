import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../api/auth.api";
import { logout } from "../../redux/reducers/authSlice";

const LogoutBtn = ({ wid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const data = await authLogout();
    if (data.status === 200) dispatch(logout());
    else console.log("Error in logout");
    navigate("/");
  };

  return (
    <button
      className="logoutBtn"
      style={{
        backgroundColor: "black",
        width: `${wid}`,
        height: "40px",
        color: "white",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
