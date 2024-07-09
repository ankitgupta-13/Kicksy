import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import Cart from "./components/Cart/Cart";
import Profile from "./components/Profile/Profile";
import Wishlist from "./components/Wishlist/Wishlist";
import { toggleProfileVisibility } from "./redux/reducers/authSlice";
import { toggleCartVisibility } from "./redux/reducers/cartSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const showProfile = useSelector((state) => state.auth.isOpen);
  const showCart = useSelector((state) => state.cart.isOpen);
  return (
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
  );
};

export default Layout;
