import React from "react";
import { Card } from "react-bootstrap";

function CardComment(props) {
  return (
    <Card style={{ width: "40%" }} className="mt-4 ms-auto me-auto">
      <Card.Header>
        <p>Hi</p>
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ cursor: "pointer" }}>{props.comment}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CardComment;
