import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { removeFromCart, updateCart } from "../../api/user.api";
import style from "./CartItemCard.module.css";

const CartItemCard = ({ item, wid }) => {
  const userID = useSelector((state) => state.auth.userData?._id);
  // console.log(item)
  const [cartQty, setCartQty] = useState(item.quantity);
  const [successMessage, setSuccessMessage] = useState("");

  const updateCartQuantity = async (productID, sellerID, operator) => {
    const data = await updateCart({
      userID,
      productID,
      sellerID,
      operator,
    });
    if (data.statusCode === 200) {
      setCartQty(data.data.quantity);
      setSuccessMessage(data.message);
    }
  };

  const handleRemoveFromCart = async (productID, sellerID) => {
    const data = await removeFromCart({
      userID,
      productID,
      sellerID,
    });
    console.log(data);
    if (data.statusCode === 200) {
      setSuccessMessage(data.message);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.item}>
        <div className={style.item_img} style={{ width: wid }}>
          <div
            className={style.item_img_c}
            style={{ backgroundImage: `url(${item.product.images[0]})` }}
          ></div>
        </div>
        <div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            {item.product.title}
          </div>
          <div style={{ fontSize: ".9rem" }}>{item.product.price}</div>
          <div style={{ display: "flex" }}>
            <span>Quantity :</span>
            <div className={style.changeQuantity}>
              <RemoveIcon
                onClick={() =>
                  updateCartQuantity(item.product._id, item.sellerID, "-")
                }
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
              />
              <span>{cartQty}</span>
              <AddIcon
                onClick={() =>
                  updateCartQuantity(item.product._id, item.sellerID, "+")
                }
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
              />
            </div>
          </div>
        </div>
      </div>
      <MediaQuery minWidth={431}>
        {successMessage ? (
          <Alert
            severity="success"
            onClose={() => {
              setSuccessMessage("");
            }}
          >
            {successMessage}
          </Alert>
        ) : (
          ""
        )}
      </MediaQuery>
      <div style={{ height: "4rem", display: "flex", fontSize: ".8rem" }}>
        <CloseIcon
          onClick={() => handleRemoveFromCart(item.product._id, item.sellerID)}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default CartItemCard;
