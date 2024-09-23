import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Crecat() {
  return (
    <div>
      <div style={{ display: "flex" ,alignItems:"center"}}>
        <div>
          <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="Enter List" />
          </Form.Group>
          </Form>
        </div>&nbsp;

        <div>
          <Button variant="outline-success">Success</Button>{" "}
        </div>
      </div>
    </div>
  );
}
