import CloseIcon from "@mui/icons-material/Close";
import { removeFromCart, updateCart } from "../../api/user.api";
import style from "./CartItemCard.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const CartItemCard = ({ item }) => {
  const userID = useSelector((state: RootState) => state.auth.userData?._id);
  return (
    <div>
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
      <div className={style.changeQuantity}>
        <RemoveIcon
          onClick={() =>
            updateCart({
              productID: item.product._id,
              sellerID: item.sellerID,
              operator: "-",
            })
          }
        />
        <AddIcon
          onClick={() =>
            updateCart({
              productID: item.product._id,
              sellerID: item.sellerID,
              operator: "+",
            })
          }
        />
      </div>
      <div>
        <CloseIcon
          onClick={() =>
            removeFromCart({
              productID: item.product._id,
              sellerID: item.sellerID,
            })
          }
        />
      </div>
    </div>
  );
};

export default CartItemCard;
