import Options from "./Options";
import React from "react";
import { useHistory } from "react-router";

import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderEntry() {
  const [orderDetails] = useOrderDetails();
  const history = useHistory();

  const handleClick = () => {
    history.push("/summary");
  };

  return (
    <div>
      <h1>Order</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>{`GrandTotal: $${orderDetails.totals.grandTotal}`}</h2>
      <button onClick={handleClick}>Place Order</button>
    </div>
  );
}
