import { useSelector } from "react-redux";
import { Input, PaymentButton } from "../../components";
import style from "./Checkout.module.css";
import { RootState } from "../../redux/store/store";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getUserCartItems } from "../../api/user.api";

const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const userID = useSelector((state: RootState) => state.auth.userID);

  useEffect(() => {
    (async () => {
      const response = await getUserCartItems({ userID });
      console.log(response);
    })();
  });
  const handleAddress = () => {};

  return (
    <div>
      <div>
        <h1>Order Summary</h1>
        <div className={style.orderSummary}></div>
      </div>
      <div className={style.address}>
        <h1>Shipping Details</h1>
        <form onSubmit={handleSubmit(handleAddress)}>
          <Input placeholder="FULLNAME " {...register("fullName")} />
          <Input placeholder="MOBILE NO. " {...register("mobile")} />
          <Input placeholder="EMAIL ADDRESS" {...register("email")} />
          <Input placeholder="ADDRESS" {...register("address")} />
          <Input placeholder="COUNTRY" {...register("country")} />
          <Input placeholder="STATE" {...register("state")} />
          <Input placeholder="CITY" {...register("city")} />
          <Input placeholder="PINCODE" {...register("pincode")} />
        </form>
      </div>
      <div className={style.checkoutButton}>
        <PaymentButton />
      </div>
    </div>
  );
};

export default Checkout;
