const CartItemCard = ({ item }) => {
  return (
    <div>
      <img src={item.product.images[0]} alt="" />
      <div>
        <div>{item.product.title}</div>
        <div>{item.product.price}</div>
        <div>
          <span>Quantity - </span>
          {item.quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
