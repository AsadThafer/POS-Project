import { useQuery } from "@tanstack/react-query";
import fetchAllOrders from "./fetchAllOrders";
import { useState } from "react";
import "./Orders.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const myorders = useQuery(["orders"], fetchAllOrders);

  if (myorders.isLoading) {
    return <div>Loading...</div>;
  }

  if (myorders.isError) {
    return <div>Error</div>;
  }

  if (orders.length === 0) {
    setOrders(myorders.data);
  }

  const searchOrders = (e) => {
    const searchValue = e.target.value;
    const filteredOrders = myorders.data.filter((order) => {
      return order.id.toString().includes(searchValue);
    });
    setOrders(filteredOrders);
  };

  return (
    <div>
      <h1>Orders</h1>
      <label htmlFor="search">Search Orders by Id :</label>
      <input type="text" onChange={searchOrders} />
      <div className="orders">
        {orders.map((order) => (
          <div key={order.id} className="order">
            <h2>Order ID: {order.id}</h2>
            <h3>Order Date: {order.createdTime}</h3>
            <h3>Order Discount Rate: {order.discountRate}%</h3>
            <h3>Order tax Rate: {order.taxRate}%</h3>

            <h3>
              Order Items:
              {order.cart_Products.map((item) => (
                <div key={item.id} className="orderItem">
                  <h4> {item.name}</h4>
                  <h4>{item.price} $</h4>
                  <h4>x{item.count}</h4>
                </div>
              ))}
            </h3>
            <h3 className="totalPrice">
              Order Total Price: {order.totalprice} $
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Orders;
