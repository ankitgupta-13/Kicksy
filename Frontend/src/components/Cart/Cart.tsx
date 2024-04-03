import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  toggleCartVisibility,
} from "../../redux/reducers/cartSlice";
import style from "./Cart.module.css";
import CartItem from "../CartItem/CartItem";
import { Button, CartItemCard, PaymentButton } from "..";
import { getUserCartItems } from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const user = useSelector((state: RootState) => state.auth.userData);
  const [cartItems, setCartItems] = useState([]);
  const userID = user?._id;
  console.log(userID);
  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };
  const handleCart = async (userID) => {
    const response = await getUserCartItems({ userID });
    setCartItems(response.data.items);
    console.log(response);
    if (response.statusCode === 200) console.log(response.data.items);
  };
  useEffect(() => {
    handleCart(userID);
  }, []);

  return (
    <div className={`${style.sidenav} ${isCartOpen ? style.open : ""}`}>
      <div className={style.cart}>
        <div className={style.head}>
          <h2>Cart</h2>
          <a className={style.closebtn} onClick={handleToggleCartVisibility}>
            &times;
          </a>
        </div>
        <div className={style.itemlist}>
          {cartItems?.map((item) => (
            <CartItemCard item={item} />
          ))}
        </div>
        <div className={style.ButtonContainer}>
          <Button className={style.button} onClick={() => navigate("/checkout")}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
