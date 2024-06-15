import { getKey, makePayment, verifyPayment } from "../../api/payment.api";
import { useSelector } from "react-redux";
import { useState } from "react";
import upiIcons from "../../assets/upi-icons.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface PaymentButtonProps {
  amount: number;
  address: {
    recipientName?: string;
    mobile?: string;
    email?: string;
    street?: string;
    country?: string;
    state?: string;
    city?: string;
    pincode?: string;
  };
}

const PaymentButton = (props: PaymentButtonProps) => {
  const user = useSelector((state: any) => state.auth.userData);
  const userID = user?._id;
  const amount = props.amount * 100;
  const address = props.address;

  const checkOutHandler = async () => {
    try {
      const key = await getKey();
      const order = await makePayment({ amount, userID, address });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: user?.username ?? "",
        description: "Razorpay tutorial",
        image: "",
        order_id: order.id,
        prefill: {
          name: user?.username ?? "",
          email: user?.email ?? "",
          contact: user?.mobile?.number ?? "",
        },
        theme: {
          color: "#000000",
        },
        handler: async (response: any) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const payload = {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            userID,
            orderDetails: order,
            addressDetails: address,
          };
          const data = await verifyPayment(payload);
          console.log(data);
          alert(data.message);
          window.location.href = "/";
        },
      };

      const razorPay = new Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("There was an error processing the payment. Please try again.");
    }
  };

  return (
    <button
      style={{
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontSize: "1rem",
        fontWeight: 600,
        color: "white",
        border: "none",
        margin: "0 1rem",
      }}
      onClick={checkOutHandler}
      type="submit"
    >
      CHECKOUT <img src={upiIcons} alt="UPI Icons" /> <ArrowForwardIosIcon />
    </button>
  );
};

export default PaymentButton;
