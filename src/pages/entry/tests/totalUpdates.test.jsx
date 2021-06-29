import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // initial charges
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6");
});

test("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // initial toppings charges
  const toppingsSubtotal = await screen.findByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("$0.00");

  // update biscoff topping to checked
  const biscoffCheckbox = await screen.findByRole("checkbox", {
    name: "Biscoff",
  });
  userEvent.clear(biscoffCheckbox);
  userEvent.click(biscoffCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // update biscoff to unchecked, while Rocher and Chocolate to checked
  const rocherCheckbox = await screen.findByRole("checkbox", {
    name: "Rocher",
  });
  const chocolateCheckbox = await screen.findByRole("checkbox", {
    name: "Chocolate",
  });
  userEvent.clear(rocherCheckbox);
  userEvent.clear(chocolateCheckbox);
  userEvent.click(biscoffCheckbox);
  userEvent.click(rocherCheckbox);
  userEvent.click(chocolateCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
});
