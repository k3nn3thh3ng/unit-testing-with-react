import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderConfirmation() {
  const [orderId, setOrderId] = useState(0);
  const [_, _2, resetCount] = useOrderDetails();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("http://localhost:3030/orders");
      return response.data.orderId;
    };
    setOrderId(fetchData());
  }, []);
  // how come axios.post("http://localhost:3030/orders").then((response)=> setOrderId(response.data.orderId))
  const handleClick = () => {
    resetCount();
    history.push("/");
  };
  return (
    <div>
      <label htmlFor="order-id">Your order number:</label>
      <input type="textbox" value={orderId} id="order-id" disabled={true} />
      <p>Your order will not be process, thanks for patronising</p>
      <button onClick={handleClick}>New Order</button>
    </div>
  );
}

export default OrderConfirmation;
