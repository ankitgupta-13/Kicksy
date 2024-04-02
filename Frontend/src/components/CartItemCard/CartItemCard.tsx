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
  const [cartQty , setCartQty] = useState(item.quantity);
  const [successMessage , setSuccessMessage] = useState("");

  const updateCartQuantity = async(productID:String , sellerID:String , operator:String)=>{
    const data = await updateCart({
      userID,
      productID,
      sellerID,
      operator
    })
    console.log(data)
    if(data.statusCode === 200){
      // alert("quantity updated")
      setCartQty(data.data.quantity)
      setSuccessMessage(data.message);
    }
  }

  return (
    <div>
      <div>
        <img src={item.product.images[0]} alt="" />
        <div>
          <div>{item.product.title}</div>
          <div>{item.product.price}</div>
          <div>
            <span>Quantity - </span>
            {cartQty}
          </div>
        </div>
      </div>
      <div className={style.changeQuantity}>
        <RemoveIcon
          onClick={() =>
            updateCartQuantity(item.product._id , item.sellerID , "-")
          }
        />
        <AddIcon
          onClick={() =>
            updateCartQuantity(item.product._id , item.sellerID , "+")
          }
        />
      </div>
      {successMessage?<Alert severity="success" onClose={()=>{setSuccessMessage("")}}>{successMessage}</Alert>:""}
      <div>
        <CloseIcon
          onClick={() =>
            removeFromCart({
              userID,
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
