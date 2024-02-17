import { useSelector } from "react-redux";

const Cart = () => {
  const Cart = useSelector((state) => state.auth?.userData?.data.cart);
  return (
    <div>
      <h1>Cart</h1>
      <h2>Quantity {Cart.length}</h2>
    </div>
  );
};

export default Cart;
