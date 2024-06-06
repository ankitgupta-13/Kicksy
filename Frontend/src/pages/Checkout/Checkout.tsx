import { ArrowBackIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserCartItems } from "../../api/user.api";
import { Button, CartItemCard, Input, PaymentButton } from "../../components";
import { RootState } from "../../redux/store/store";
import style from "./Checkout.module.css";
import mainLogo from "../../assets/Krisksy.png";

interface Address {
  recipientName: string;
  mobile: string;
  email: string;
  street: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
}

const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.userData?._id);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getUserCartItems({ userID });
      if (response.statusCode === 200) {
        response.data?.items && setCartItems(response.data?.items);
        setCartTotal(response.data?.cartTotal);
      }
    })();
  }, [userID]);

  const handleAddress = (data: Address) => {
    setAddress(data);
  };

  return (
    <div>
      <div className={style.header}>
        <Button className={style.backButton} style={{ backgroundColor: "transparent" }} onClick={() => navigate("/")}>
          <ArrowBackIos />
        </Button>
        <img src={mainLogo} alt="kriksky logo" style={{ width: "150px" }} />
      </div>
      <form onSubmit={handleSubmit(handleAddress)}>
        <div className={style.checkOut}>
          <h1>Order Summary</h1>
          {!cartItems ? <div className={style.orderSummary}>
            {cartItems?.map((item, index) => (
              <div className={style.cartItem} key={index}>
                <CartItemCard item={item} />
              </div>
            ))}
          </div> : <p style={{ textAlign: "center", padding: "2rem", fontSize: "1.5rem", fontWeight: 600 }}>No items in cart</p>}
        </div>
        <div className={style.addressForm}>
          <h1>Shipping Details</h1>
          <Input placeholder="FULLNAME" {...register("recipientName", { required: true })} />
          <Input placeholder="MOBILE NO." {...register("mobile", { required: true })} />
          <Input placeholder="EMAIL ADDRESS" {...register("email", { required: true })} />
          <Input placeholder="ADDRESS" {...register("street", { required: true })} />
          <Input placeholder="COUNTRY" {...register("country", { required: true })} />
          <Input placeholder="STATE" {...register("state", { required: true })} />
          <Input placeholder="CITY" {...register("city", { required: true })} />
          <Input placeholder="PINCODE" {...register("pincode", { required: true })} />
        </div>
        <div className={style.checkoutButton}>
          {!address && <button type="submit" style={{ backgroundColor: "black", color: "white", outline: "none", border: "none", fontSize: "1.2rem", fontFamily: "Noir Pro", fontWeight: 600, cursor: "pointer" }}>Set Address</button>}
          {address && <PaymentButton amount={cartTotal} address={address} />}
        </div>
      </form>
    </div>
  );
};

export default Checkout;
