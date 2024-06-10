import React from 'react';
import style from './OrderDashboardCard.module.css';

export default function OrderDashboardCard({ order }: { order: any }) {
    return (
        <div className={style.ordercard}>
            <div className="ord" style={{display: "flex"}}>
                <div className={style.order_dets}>Order ID: </div> 
                <div className={style.order_dets_c}> {order._id}</div>
            </div>
            <div className="ord" style={{display: "flex"}}>
                <div className={style.order_dets}>Order Status: </div> 
                <div className={style.order_dets_c}> {order.status}</div>
            </div>
            <div className="ord" style={{display: "flex"}}>
                <div className={style.order_dets}>Order Date: </div>
                <div className={style.order_dets_c}> {order.createdAt}</div>
            </div>
            <div className="ord" style={{display: "flex"}}>
                <div className={style.order_dets}>Order Total: </div>
                <div className={style.order_dets_c}> {order.total}</div>
            </div>
            <div className={style.order_dets} style={{border: "none", marginBottom: "1rem"}}>Order Items:</div>
            <table style={{width: "100%"}}>
                <tr>
                    <th style={{borderRight: "1px solid #fff"}}>Name</th>
                    <th style={{borderRight: "1px solid #fff"}}>Price</th>
                    <th>Quantity</th>
                </tr>

                {order.orderItems && Array.isArray(order.orderItems) && order.orderItems.length > 0 ? (
                    order.orderItems.map((item: any) => (
                        <tr key={item._id}>
                            <td style={{textAlign: "center", borderRight: "1px solid #fff"}}>{item.name}</td>
                            <td style={{textAlign: "center", borderRight: "1px solid #fff"}}>{item.price}</td>
                            <td style={{textAlign: "center"}}>{item.quantity}</td>
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
