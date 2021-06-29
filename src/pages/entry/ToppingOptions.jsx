import { Col, Form, Row } from "react-bootstrap";

export default function ToppingOptions({ name, imagePath, updateItemCount }) {
  const handleChange = (event) => {
    if (event.target.checked) {
      updateItemCount(name, 1);
      return;
    }
    updateItemCount(name, 0);
    return;
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: "75%" }}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <label htmlFor={name}>{name}</label>
        <input type="checkbox" onChange={handleChange} id={name} />
      </Form.Group>
    </Col>
  );
}
