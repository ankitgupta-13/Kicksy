import { set } from "react-hook-form";
import { getKey, makePayment, verifyPayment } from "../../api/payment.api";
import { useSelector } from "react-redux";
import { useState } from "react";

import upiIcons from "../../assets/upi-icons.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PaymentButton = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const userID = user?._id;
  const amount = props.amount * 100;
  const address = props.address;
  const checkOutHandler = async () => {
    const key = await getKey();
    const order = await makePayment({ amount, userID, address });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: user.username,
      description: "Razorpay tutorial",
      image: "",
      order_id: order.id,
      prefill: {
        name: user?.username,
        email: user?.email,
        contact: user?.mobile.number,
      },
      theme: {
        color: "#000000",
      },
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        const payload = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          userID,
          orderDetails: order,
          addressDetails: order.addressDetails,
        };
        const data = await verifyPayment(payload);
        alert(data.message);
      },
    };
    const razorPay = new Razorpay(options);
    razorPay.open();
  };

  return (
    <button
      style={{
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontSize: "1rem",
        // width: "100%",
        // height: "100%",
        fontWeight: 600,
        color: "white",
        border: "none",
        margin: "0 1rem",
      }}
      onClick={checkOutHandler}
    >
      CHECKOUT <img src={upiIcons} alt="" /> <ArrowForwardIosIcon />
    </button>
  );
};

export default PaymentButton;
