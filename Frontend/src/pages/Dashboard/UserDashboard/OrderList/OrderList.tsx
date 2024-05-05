import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrderHistory } from "../../../../api/user.api";
import { RootState } from "../../../../redux/store/store";

import OrderDashboardCard from "../../../../components/OrderDashboardCard/OrderDashboardCard.tsx";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const userID = useSelector((state: RootState) => state.auth.userData?._id);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrderHistory({ userID: String(userID) });
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
            <OrderDashboardCard order={order} />
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
