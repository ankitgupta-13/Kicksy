import { useEffect, useState } from "react";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./api/user.api";
import { login, logout } from "./redux/reducers/authSlice";
import Sidebar from "./components/Sidebar/Sidebar";
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
          <Sidebar/>

        </div>
      )}
    </>
  );
};

export default Layout;
