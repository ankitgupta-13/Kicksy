import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrderHistory } from "../../../../api/user.api.js";
import OrderDashboardCard from "../../../../components/OrderDashboardCard/OrderDashboardCard.jsx";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const userID = useSelector((state) => state.auth.userData?._id);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrderHistory({ userID });
      console.log(response.data.orders);
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      {orders?.map((order) => {
        return (
          <div key={order._id}>
            <OrderDashboardCard order={order} />
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
