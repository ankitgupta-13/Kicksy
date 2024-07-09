import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, CartItemCard } from "..";
import { getUserCartItems } from "../../api/user.api";
import { toggleCartVisibility } from "../../redux/reducers/cartSlice";
import style from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const userData = useSelector((state) => state.auth.userData);
  const [cartItems, setCartItems] = useState([]);
  const userID = userData?._id;
  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };
  const showCart = useSelector((state) => state.cart.isOpen);
  const handleCart = async (userID) => {
    const response = await getUserCartItems({ userID });
    if (response.statusCode === 200) {
      setCartItems(response.data.items);
    }
  };
  useEffect(() => {
    handleCart(userID);
  }, []);

  return (
    <div className={`${style.sidenav} ${isCartOpen ? style.open : ""}`}>
      <div className={style.cart}>
        <div className={style.head}>
          <h2>Cart</h2>
          <a
            className={style.closebtn}
            onClick={() => showCart && handleToggleCartVisibility}
          >
            &times;
          </a>
        </div>
        <div className={style.itemlist}>
          {cartItems?.map((item) => (
            <CartItemCard item={item} wid={"4rem"} key={item._id} />
          ))}
        </div>
        <div className={style.ButtonContainer}>
          <Button
            className={style.button}
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
