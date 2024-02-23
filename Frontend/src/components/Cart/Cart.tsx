import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addItem,removeItem,toggleCartVisibility,setInitialCartItems} from "../../redux/reducers/cartSlice";
import style from './Cart.module.css';
import CartItem from "../CartItem/CartItem";
import { PaymentButton } from "..";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartOpen = useSelector((state) => state.cart.isOpen);

  const handleToggleCartVisibility = () => {
    dispatch(toggleCartVisibility());
  };

  return (
      <div id="mySidenav" className={`${style.sidenav} ${isCartOpen ? style.open : ''}`}>
      <div className={style.head}>
        <h2>Cart</h2>
        <a className={style.closebtn} onClick={handleToggleCartVisibility}>&times;</a>  
      </div>
      <div className={style.itemlist}>
      {cartItems.map((item) => (
        <CartItem productID={item.product} quantity={item.qty} />
      ))}
      </div>
      <div>
        <div>

        </div>
        <div className={style.paymentbutton}>
          <PaymentButton amount={100}/>
        </div>
      </div>
      </div>
  );
};

export default Cart;
