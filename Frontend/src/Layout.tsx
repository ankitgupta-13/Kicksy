import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Profile from "./components/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileVisibility } from "./redux/reducers/authSlice";
import { RootState } from "./redux/store/store";
import { toggleCartVisibility } from "./redux/reducers/cartSlice";

const Layout = ({ loading }) => {
  const dispatch = useDispatch();
  const showProfile = useSelector((state: RootState) => state.auth.isOpen);
  const showCart = useSelector((state: RootState) => state.cart.isOpen);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          onClick={() => {
            showProfile && dispatch(toggleProfileVisibility());
            showCart && dispatch(toggleCartVisibility());
          }}
        >
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
