import { ArrowBackIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserCartItems } from "../../api/user.api";
import { Button, CartItemCard, Input, PaymentButton } from "../../components";
import { RootState } from "../../redux/store/store";
import style from "./Checkout.module.css";

const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.userData?._id);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getUserCartItems({ userID });
      if (response.statusCode === 200) {
        response.data?.items && setCartItems(response.data?.items);
        setCartTotal(response.data?.cartTotal);
      }
    })();
  }, []);
  const handleAddress = (data: Object) => {
    setAddress(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddress)}>
        <div>
          <h1>Order Summary</h1>
          <div className={style.orderSummary}>
            <Button className={style.backButton} onClick={() => navigate("/")}>
              <ArrowBackIos />
              <span>Back</span>
            </Button>
            {cartItems?.map((item) => (
              <div className={style.cartItem}>
                <CartItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className={style.address}>
          <h1>Shipping Details</h1>
          <Input
            placeholder="FULLNAME "
            {...register("recipientName", { required: true })}
          />
          <Input
            placeholder="MOBILE NO. "
            {...register("mobile", { required: true })}
          />
          <Input
            placeholder="EMAIL ADDRESS"
            {...register("email", { required: true })}
          />
          <Input
            placeholder="ADDRESS"
            {...register("street", { required: true })}
          />
          <Input
            placeholder="COUNTRY"
            {...register("country", { required: true })}
          />
          <Input
            placeholder="STATE"
            {...register("state", { required: true })}
          />
          <Input placeholder="CITY" {...register("city", { required: true })} />
          <Input
            placeholder="PINCODE"
            {...register("pincode", { required: true })}
          />
        </div>
        <div className={style.checkoutButton}>
          <PaymentButton amount={cartTotal} address={address} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Checkout;
