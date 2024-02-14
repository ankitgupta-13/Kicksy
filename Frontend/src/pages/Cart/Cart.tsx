import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  return (
    <div>
      <h1>Cart</h1>
      <h2>Quantity {items.length}</h2>
    </div>
  );
};

export default Cart;
