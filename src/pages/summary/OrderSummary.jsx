import React from "react";

import SummaryForm from "./SummaryForm";
import SummaryInfo from "./SummaryInfo";

function OrderSummary() {
  return (
    <React.Fragment>
      <SummaryInfo />
      <SummaryForm />
    </React.Fragment>
  );
}

export default OrderSummary;
