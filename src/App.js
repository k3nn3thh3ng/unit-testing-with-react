import React from "react";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import { Route, Switch } from "react-router-dom";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

const NoMatch = () => <h1>No Match Available</h1>;

function App() {
  return (
    <OrderDetailsProvider>
      <Switch>
        <Route exact path="/">
          <OrderEntry />
        </Route>

        <Route path="/summary">
          <OrderSummary />
        </Route>

        <Route path="/confirmation">
          <OrderConfirmation />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </OrderDetailsProvider>
  );
}

export default App;
