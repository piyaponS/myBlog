import { Card, Row, Col } from "react-bootstrap";
import Avatar from "react-nice-avatar";
import classes from "./CardMessage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CardMessage(props) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const convertTime = (time) => {
    const date = new Date(time);
    const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return dateTimeFormat.format(date);
  };
  const clickProfileHandler = () => {
    user._id === props.userId
      ? navigate(`/auth/profile/${user._id}`)
      : navigate(`/auth/profile/friends/${props.userId}`);
  };
  return (
    <Card style={{ width: "70%" }} className="mt-4 ms-5">
      <Card.Header>
        <Row>
          <Col sm="1">
            <div onClick={clickProfileHandler}>
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
              />
            </div>
          </Col>

          <Col sm="11">
            <Row>
              <p style={{ margin: "0", padding: "0" }}>
                <span
                  className={classes.hoverLetter}
                  onClick={clickProfileHandler}
                >
                  {props.name}
                </span>
              </p>
            </Row>
            <Row>{convertTime(props.createdAt)}</Row>
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
