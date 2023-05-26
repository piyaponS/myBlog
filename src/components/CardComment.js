import React from "react";
import { Card } from "react-bootstrap";

function CardComment(props) {
  return (
    <Card style={{ width: "70%" }} className="mt-4 ms-5">
      <Card.Header>
        <h1>sax</h1>
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ cursor: "pointer" }}>{props.comment}</Card.Title>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
}

export default CardComment;
