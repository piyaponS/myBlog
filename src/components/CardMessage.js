import { Card, Row, Col } from "react-bootstrap";
import Avatar from "react-nice-avatar";
import classes from "./CardMessage.module.css";

function CardMessage(props) {
  return (
    <Card style={{ width: "70%" }} className="mt-4 ms-5">
      <Card.Header>
        <Row>
          <Col sm="1">
            <Avatar
              style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
              faceColor={props.faceColor}
              hairStyle={props.hairStyle}
              hatStyle={props.hatStyle}
              glassesStyle={props.glassesStyle}
              eyeBrowStyle={props.eyeBrowStyle}
              eyeStyle={props.eyeStyle}
              earSize={props.earSize}
              noseStyle={props.noseStyle}
              mouthStyle={props.mouthStyle}
              shirtStyle={props.shirtStyle}
              hairColor={props.hairColor}
              shirtColor={props.shirtColor}
              bgColor={props.bgColor}
              className="mt-2"
            />{" "}
          </Col>

          <Col sm="11">
            <Row>
              <p style={{ margin: "0", padding: "0" }}>
                <span className={classes.hoverLetter}>{props.name}</span>
              </p>
            </Row>
            <Row>Hi</Row>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.description}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
        <Card.Text>{props.taglist}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardMessage;
