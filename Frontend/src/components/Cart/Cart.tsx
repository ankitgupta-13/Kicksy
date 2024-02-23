import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  toggleCartVisibility,
  setInitialCartItems,
} from "../../redux/reducers/cartSlice";
import styles from './Cart.module.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isOpen);

  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };

  return (
    <div>
      <div id="mySidenav" className={`${styles.sidenav} ${isCartOpen ? styles.open : ''}`}>
        <h3>Cart</h3>
        <a href="javascript:void(0)" className={styles.closebtn} onClick={handleToggleCartVisibility}>&times;</a>
      </div>

    </div>
  );
};

export default Sidebar;
