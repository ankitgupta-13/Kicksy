import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../../api/admin.api";

const ListOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllOrders();
      console.log(response);
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);
  return (
    <div
    // style={{
    //   height: "71vh",
    //   fontSize: "3rem",
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   fontFamily: "Noir Pro",
    //   color: "#888",
    // }}
    >
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

export default ListOrder;
