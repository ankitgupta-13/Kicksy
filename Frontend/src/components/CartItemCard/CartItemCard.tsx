import CloseIcon from "@mui/icons-material/Close";
import { removeFromCart, updateCart } from "../../api/user.api";
import style from "./CartItemCard.module.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useState } from "react";
import { Alert } from "@mui/material";

const CartItemCard = ({ item }) => {
  const userID = useSelector((state: RootState) => state.auth.userData?._id);
  // console.log(item)
  const [cartQty, setCartQty] = useState(item.quantity);
  const [successMessage, setSuccessMessage] = useState("");

  const updateCartQuantity = async (
    productID: String,
    sellerID: String,
    operator: String
  ) => {
    const data = await updateCart({
      userID,
      productID,
      sellerID,
      operator,
    });
    console.log(data);
    if (data.statusCode === 200) {
      // alert("quantity updated")
      setCartQty(data.data.quantity);
      setSuccessMessage(data.message);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.item}>
        <div className={style.item_img}>
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
      <div style={{ height: "4rem", display: "flex", fontSize: ".8rem" }}>
        <CloseIcon
          onClick={() =>
            removeFromCart({
              userID,
              productID: item.product._id,
              sellerID: item.sellerID,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default CartItemCard;
