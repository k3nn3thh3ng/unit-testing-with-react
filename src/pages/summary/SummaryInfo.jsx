import React from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";

function SummaryInfo() {
  const [orderDetails] = useOrderDetails();

  const renderOrder = (optionType) => {
    const options = orderDetails[optionType];
    let results = [];
    for (let option of options.entries()) {
      results.push({
        key: option[0],
        value: option[1],
      });
    }
    const returnRender = results.map((result) => {
      return (
        <React.Fragment key={result.key}>
          <p>{result.key}</p>
          <p>Quantity: {result.value}</p>
        </React.Fragment>
      );
    });
    return returnRender;
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops</h2>
      {renderOrder("scoops")}
      <h2>Toppings</h2>
      {renderOrder("toppings")}
      <h2>{`GrandTotal: $${orderDetails.totals.grandTotal}`}</h2>
    </div>
  );
}

export default SummaryInfo;
