import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKey, makePayment, verifyPayment } from "../../api/payment.api";
import upiIcons from "../../assets/upi-icons.svg";

const PaymentButton = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const userID = user?._id;
  const amount = props.amount * 100;
  const address = props.address;
  const navigate = useNavigate();

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
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
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
          navigate("/");
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
