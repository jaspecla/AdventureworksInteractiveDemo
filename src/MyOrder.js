import React, { useState } from "react";
import OrderDetail from "./OrderDetail";
import getOrderData from './api/orderData';
import "./MyOrder.css"

function MyOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  async function getOrderDataFromApi() {
    var orderData = await getOrderData(orderNumber);
    setOrderDetails(orderData);
  }

  function updateOrderNumber(event) {
    setOrderNumber(event.target.value);
  }

  return(
    <div>
      <h1>My Order</h1>
      <h2>Enter an order number:</h2>
      <input type="text" value={orderNumber} onChange={updateOrderNumber} />
      <div className="orderButton">
        <button onClick={() => { getOrderDataFromApi() }}>Get My Order</button>
      </div>
      <OrderDetail order={orderDetails} />
    </div>
  );
}


export default MyOrder;