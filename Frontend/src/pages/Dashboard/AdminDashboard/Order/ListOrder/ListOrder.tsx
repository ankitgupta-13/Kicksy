import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../../api/admin.api";
import OrderDashboardCard from "../../../../../components/OrderDashboardCard/OrderDashboardCard";

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
    <div>
      {orders?.map((order: any) => {
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
