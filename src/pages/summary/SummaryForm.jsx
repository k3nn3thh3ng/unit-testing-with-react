import React, { useState } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function SummaryForm() {
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const handleCheck = (event) => {
    setDisabled(!event.target.checked);
  };

  const handleClick = () => {
    history.push("/confirmation");
  };

  const popover = (
    <Popover id="popover-TandC">
      <Popover.Content>no ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>terms and conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <div>
      <input type="checkbox" id="agree-to-TandC" onClick={handleCheck} />
      <label htmlFor="agree-to-TandC">{checkboxLabel}</label>

      <button
        type="button"
        disabled={disabled}
        style={{ backgroundColor: disabled ? "gray" : "white" }}
        onClick={handleClick}
      >
        Confirm order
      </button>
    </div>
  );
}

export default SummaryForm;
