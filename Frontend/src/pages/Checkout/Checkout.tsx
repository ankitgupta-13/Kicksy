import { useSelector } from "react-redux";
import { Button, CartItemCard, Input, PaymentButton } from "../../components";
import style from "./Checkout.module.css";
import { RootState } from "../../redux/store/store";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getUserCartItems } from "../../api/user.api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

<<<<<<< Updated upstream
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useNavigate } from "react-router-dom";

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    <div className={style.main}>
      <Button className={style.backButton} onClick={() => navigate("/")}>
        <ArrowBackIosIcon />
        <span>Back</span>
      </Button>
      {cartItems?.length == 0 ? (
        (console.log(cartItems.length), (<div>Cart Is Empty</div>))
      ) : (
        <form onSubmit={handleSubmit(handleAddress)}>
          <div className={style.checkOut}>
            <h1>
              <ShoppingCartOutlinedIcon /> Order Summary
            </h1>
            <hr />
            <div className={style.orderSummary}>
              {cartItems?.map((item) => (
                <div className={style.cartItem}>
                  <CartItemCard item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className={style.addressForm}>
            <h1>
              <LocalShippingOutlinedIcon /> Shipping Details
            </h1>
            <Input
              placeholder="FULLNAME"
              {...register("recipientName", { required: true })}
            />
            <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
              <Input
                width={"30%"}
                placeholder="MOBILE NO. "
                {...register("mobile", { required: true })}
              />
              <Input
                width={"70%"}
                border="none"
                placeholder="EMAIL ADDRESS"
                {...register("email", { required: true })}
              />
            </div>
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
            <Input
              placeholder="CITY"
              {...register("city", { required: true })}
            />
            <Input
              placeholder="PINCODE"
              {...register("pincode", { required: true })}
            />
          </div>
          <div className={style.checkoutButton}>
            <PaymentButton amount={cartTotal} address={address} type="submit" />
          </div>
        </form>
      )}
=======
    <div>
      <form onSubmit={handleSubmit(handleAddress)}>
        <div>
          <h1>Order Summary</h1>
          <div className={style.orderSummary}>
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
>>>>>>> Stashed changes
    </div>
  );
};

export default Checkout;
