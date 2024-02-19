import { useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./api/user.api";
import { login, logout } from "./redux/reducers/authSlice";

const Layout = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
