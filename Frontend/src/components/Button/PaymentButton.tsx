import { getKey, makePayment, verifyPayment } from "../../api/payment.api";
import { useSelector } from "react-redux";

const PaymentButton = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const userID = user?._id;
  console.log(user)
  const amount = props.amount * 100;
  const productIDs = [props.productID];
  const checkOutHandler = async () => {
    const key = await getKey();
    const order = await makePayment({ amount, userID, productIDs });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Ankit Gupta",
      description: "Razorpay tutorial",
      image: "",
      order_id: order.id,
      prefill: {
        name: user?.username,
        email: user?.email,
        contact: user?.mobile.number,
      },
      notes: {
        address: "abcdefghijkl",
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
          // address: "abcdefghijkl",
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
        width: "180px",
        height: "40px",
        color: "white",
        border: "none",
      }}
      onClick={checkOutHandler}
    >
      CHECKOUT
    </button>
  );
};

export default PaymentButton;
