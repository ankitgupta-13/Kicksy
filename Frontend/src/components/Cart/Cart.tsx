import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  toggleCartVisibility,
  setInitialCartItems,
} from "../../redux/reducers/cartSlice";
import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const user = useSelector((state) => state.auth.userData);
  const userID = user?._id;
  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };

  // useEffect(() => {
  //   handleGetCartItems(userID);
  // }, []);

  return (
    <div>
      <div
        id="mySidenav"
        className={`${styles.sidenav} ${isCartOpen ? styles.open : ""}`}
      >
        <h3>Cart</h3>
        <a
          href="javascript:void(0)"
          className={styles.closebtn}
          onClick={handleToggleCartVisibility}
        >
          &times;
        </a>
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.product}</p>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => dispatch(removeItem(item))}
                    className={styles.remove}
                  >
                    Remove
                  </button>
                </div>
              );
            })
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
