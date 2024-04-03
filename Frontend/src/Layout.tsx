import {Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Profile from "./components/Profile/Profile";

const Layout = ({ loading }) => {
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header />
          <Outlet />
          <Cart />
          <Wishlist />
          <Profile />
          <Footer/>
        </div>
      )}
    </>
  );
};

export default Layout;
