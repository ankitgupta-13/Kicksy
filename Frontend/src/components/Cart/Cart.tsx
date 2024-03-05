import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  toggleCartVisibility,
  setInitialCartItems,
} from "../../redux/reducers/cartSlice";
import style from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import { PaymentButton } from "..";
import { getUserCartItems } from "../../api/user.api";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const user = useSelector((state) => state.auth.userData);
  const userID = user?._id;

  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };
  const handleCart = async (userID) => {
    const response = await getUserCartItems({ userID });
    console.log(response);
    if (response.statusCode === 200)
      dispatch(setInitialCartItems(response.data.items));
  };
  useEffect(() => {
   handleCart(userID);
  }, []);

  return (
    <div className={`${style.sidenav} ${isCartOpen ? style.open : ""}`}>
      <div className={style.head}>
        <h2>Cart</h2>
        <a className={style.closebtn} onClick={handleToggleCartVisibility}>
          &times;
        </a>
      </div>
      <div className={style.itemlist}>
        {cartItems?.map((item) => (
          <CartItem productID={item.product} quantity={item.qty} />
        ))}
      </div>
      <div>
        <div></div>
        <div className={style.paymentbutton}>
          <PaymentButton amount={100} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
