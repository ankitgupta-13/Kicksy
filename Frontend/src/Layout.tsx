import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Profile from "./components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileVisibility } from "./redux/reducers/authSlice";
import { RootState } from "./redux/store/store";

const Layout = ({ loading }) => {
  const dispatch = useDispatch();
  const showProfile = useSelector((state: RootState) => state.auth.isOpen);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        // <div onClick={() => showProfile && dispatch(toggleProfileVisibility())}>
        <div>
          <Header />
          <Outlet />
          <Cart />
          <Wishlist />
          <Profile />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
