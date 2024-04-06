import { useEffect } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api("http://localhost:5000/orders");
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return <div>OrderList</div>;
};

export default OrderList;
