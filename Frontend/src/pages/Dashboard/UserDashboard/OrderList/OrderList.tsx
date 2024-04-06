import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrderHistory } from "../../../../api/user.api";
import { RootState } from "../../../../redux/store/store";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const userID = useSelector((state: RootState) => state.auth.userData?._id);
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
      {orders?.map((order: any) => {
        return (
          <div key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <h3>Order Status: {order.status}</h3>
            <h3>Order Date: {order.createdAt}</h3>
            <h3>Order Total: {order.total}</h3>
            <h3>Order Items:</h3>
            <ul>
              {order.orderItems.map((item: any) => {
                return (
                  <li key={item._id}>
                    <h3>{item.name}</h3>
                    <h3>{item.price}</h3>
                    <h3>{item.quantity}</h3>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
