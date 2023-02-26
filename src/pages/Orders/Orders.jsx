import { useQuery } from "@tanstack/react-query";
import fetchAllOrders from "../../helpers/fetchOrders/fetchAllOrders";
import "./Orders.css";
import { useState, useEffect } from "react";
import moment from "moment";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import SearchBar from "../../components/SearchBar/SearchBar";
const Orders = () => {
  const myorders = useQuery(["orders"], fetchAllOrders);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      let uri = `http://localhost:3000/orders`;
      const response = await fetch(uri);
      const data = await response.json();
      setOrders(data);
    };
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (myorders.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">↻</h2>
      </div>
    );
  }

  if (myorders.isError) {
    return <div>Something went wrong</div>;
  }

  const searchOrders = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      return setOrders(myorders.data);
    }
    const filteredOrders = orders.filter((order) => {
      return order.id.toString().includes(searchTerm);
    });
    setOrders(filteredOrders);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))

      .then(() => {
        const filteredOrders = orders.filter((order) => order.id !== id);
        setOrders(filteredOrders);
      });
  };

  return (
    <div>
      <h1>Orders</h1>
      <SearchBar
        onSearchTermChange={searchOrders}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={"order"}
      />
      <span className="ordersCount">
        Displayed Orders Count :
        {orders.length > 0 ? orders.length : " No Orders Found"}
      </span>
      {orders.map((order) => (
        <div key={order.id} className="order">
          <h2>Order ID: {order.id}</h2>
          <h3>Order Date: {moment(order.createdTime).format("lll")}</h3>
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
          <span className="deleteOrder">
            <ConfirmDialog
              title="Delete Order"
              onConfirm={() => {
                handleDelete(order.id);
              }}
            >
              <button className="deleteOrder">Delete Order</button>
            </ConfirmDialog>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Orders;
