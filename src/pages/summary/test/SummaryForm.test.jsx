import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("code quiz 1", () => {
  test("empty test", () => {});

  test("initial state", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /I agree to Terms and Conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole("button", { name: "Confirm order" });
    expect(confirmButton).toBeDisabled();
    expect(confirmButton).toHaveStyle({ backgroundColor: "gray" });
  });

  test("Behaviour: agreed to t&c", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /I agree to Terms and Conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
      name: "Confirm order",
    });
    userEvent.click(checkbox);

    expect(confirmButton).toBeEnabled();
    expect(confirmButton).not.toHaveStyle({ backgroundColor: "gray" });
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
