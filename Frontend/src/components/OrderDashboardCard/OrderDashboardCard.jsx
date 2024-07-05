import React, { useEffect, useState } from "react";
import { filterProducts } from "../../api/product.api";
import style from "./OrderDashboardCard.module.css";

export default function OrderDashboardCard({ order }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [orProds, setOrProds] = useState([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const data = await filterProducts(filters);
      setFilteredProducts(data.data);

      const matchedProducts = data.data.filter((product) =>
        order.orderItems.some((item) => item.product === product._id)
      );
      setOrProds(matchedProducts);
    };
    fetchFilteredProducts();
  }, [order]);

  const combinedOrderItems = order.orderItems.map((orderItem) => {
    const product = orProds.find((prod) => prod._id === orderItem.product);
    return {
      ...orderItem,
      title: product?.title || orderItem.product, // Fallback to product ID if title is not found
      bestPrice: product?.bestPrice?.price || orderItem.price,
    };
  });

  const formattedOrderPrice =
    typeof order.orderPrice === "number"
      ? order.orderPrice.toString().slice(0, -2)
      : order.orderPrice.slice(0, -2);

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const date = new Date(order?.createdAt);
  const formattedDate = date?.toLocaleDateString("en-IN", options);

  return (
    <div className={style.ordercard}>
      <div className="ord" style={{ display: "flex" }}>
        <div className={style.order_dets}>Order ID: </div>
        <div className={style.order_dets_c}> {order._id}</div>
      </div>
      <div className="ord" style={{ display: "flex" }}>
        <div className={style.order_dets}>Address ID: </div>
        <div className={style.order_dets_c}> {order.address}</div>
      </div>
      <div className="ord" style={{ display: "flex" }}>
        <div className={style.order_dets}>Order Status: </div>
        <div className={style.order_dets_c}> {order.orderStatus}</div>
      </div>
      <div className="ord" style={{ display: "flex" }}>
        <div className={style.order_dets}>Order Date: </div>
        <div className={style.order_dets_c}> {formattedDate}</div>
      </div>
      <div className="ord" style={{ display: "flex" }}>
        <div className={style.order_dets}>Order Total: </div>
        <div className={style.order_dets_c}>
          {" "}
          {formattedOrderPrice.toLocaleString("en-IN")}
        </div>
      </div>
      <div
        className={style.order_dets}
        style={{ border: "none", marginBottom: "1rem" }}
      >
        Order Items:
      </div>
      <table style={{ width: "100%" }}>
        <tr>
          <th style={{ borderRight: "1px solid #fff" }}>Name</th>
          <th style={{ borderRight: "1px solid #fff" }}>Price</th>
          <th>Quantity</th>
        </tr>

        {order.orderItems &&
        Array.isArray(order.orderItems) &&
        order.orderItems.length > 0 ? (
          combinedOrderItems.map((item) => (
            <tr key={item._id}>
              <td
                style={{ textAlign: "center", borderRight: "1px solid #fff" }}
              >
                {item.title}
              </td>
              <td
                style={{ textAlign: "center", borderRight: "1px solid #fff" }}
              >
                {item.bestPrice}
              </td>
              <td style={{ textAlign: "center" }}>{item.quantity}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No order items found</td>
          </tr>
        )}
      </table>
    </div>
  );
}
