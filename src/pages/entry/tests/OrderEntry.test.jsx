import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-utils";

import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("grand total 0.00", async () => {
  render(<OrderEntry />);

  await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const grandTotal = screen.getByText("GrandTotal: $", { exact: false });
  expect(grandTotal).toHaveTextContent("0.00");
});

test("grand total calculation", async () => {
  render(<OrderEntry />);

  const grandTotal = screen.getByText("GrandTotal: $", { exact: false });
  expect(grandTotal).toHaveTextContent("0.00");

  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "2");

  const biscoffTopping = await screen.findByRole("checkbox", {
    name: "Biscoff",
  });
  userEvent.clear(biscoffTopping);
  userEvent.click(biscoffTopping);

  expect(grandTotal).toHaveTextContent("5.50");
});
