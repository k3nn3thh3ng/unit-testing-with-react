import { render, screen } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import React from "react";
import { createMemoryHistory } from "history";

import App from "../App";

test("router test on homepage", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const orderEntryHeader = screen.getByRole("heading", { name: "Order" });
  await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await screen.findByRole("checkbox", {
    name: "Biscoff",
  });
  expect(orderEntryHeader).toBeInTheDocument();
});

test("programatically routing notfound page", () => {
  const history = createMemoryHistory();
  const route = "/some-route";
  history.push(route);
  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const orderEntryHeader = screen.getByRole("heading", {
    name: "No Match Available",
  });
  expect(orderEntryHeader).toBeInTheDocument();
});

test("order phases for happy path", async () => {
  // render app
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // add ice cream scoops and toppings
  let vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  let biscoffTopping = await screen.findByRole("checkbox", {
    name: "Biscoff",
  });
  expect(vanillaScoop).toBeInTheDocument();
  expect(biscoffTopping).toBeInTheDocument();
  userEvent.clear(vanillaScoop);
  userEvent.clear(biscoffTopping);
  userEvent.type(vanillaScoop, "1");
  userEvent.click(biscoffTopping);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: /Place Order/i });
  userEvent.click(orderButton);

  // check summary information based on order
  const vanillaSummary = screen.getByText(/vanilla/i);
  expect(vanillaSummary).toBeInTheDocument();
  const grandTotal = screen.getByRole("heading", { name: /grandtotal:/i });
  expect(grandTotal).toHaveTextContent("$3.50");

  // accept terms and conditions and click button to confirm order
  const tandcCheckbox = screen.getByRole("checkbox", {
    name: /I agree to Terms and Conditions/i,
  });
  expect(tandcCheckbox).not.toBeChecked();
  userEvent.click(tandcCheckbox);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  userEvent.click(confirmButton);

  // confirm order number on confirmation page
  const orderId = await screen.findByRole("textbox", {
    name: "Your order number:",
  });
  expect(orderId).toHaveValue();

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /New Order/i });
  expect(newOrderButton).toBeInTheDocument();
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  biscoffTopping = await screen.findByRole("checkbox", {
    name: "Biscoff",
  });
  expect(vanillaScoop).toHaveValue(0);
  expect(biscoffTopping).not.toBeChecked();

  // do we need to await anything to avoid test errors?
});
