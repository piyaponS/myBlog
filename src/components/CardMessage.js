import Card from "react-bootstrap/Card";

function CardMessage(props) {
  return (
    <Card style={{ width: "70%" }} className="mt-4 ms-5">
      <Card.Header>{props.title}</Card.Header>
      <Card.Body>
        <Card.Title>{props.description}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
        <Card.Text>{props.taglist}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardMessage;
