import { useSelector } from "react-redux";
import { useState } from "react";
import style from './Cart.module.css'

const Cart = ({ visible, onclose }) => {
  const userCart = useSelector((state) => state.auth?.userData?.cart);
  return (
    <div className={`${visible ? style.sidebar : style.notvisible}`}>
      <button onClick={onclose}>close</button>
      {visible && (
        <div>
          {/* {userCart.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};
export default Cart;
