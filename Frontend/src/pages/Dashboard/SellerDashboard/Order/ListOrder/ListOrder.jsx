import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../../api/admin.api";
import OrderDashboardCard from "../../../../../components/OrderDashboardCard/OrderDashboardCard";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);

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

export default ListOrder;
