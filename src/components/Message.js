import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Message.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalMessage from "./ModalMessage";
import { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "react-nice-avatar";

function Message() {
  const [showModal, setShowModal] = useState(false);
  const [modalZIndex, setModalZIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const openModal = () => {
    setShowModal(true);
    setModalZIndex(10);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalZIndex(0);
  };
  return (
    <>
      <Form className={classes.form}>
        <Row>
          <Col sm={2}>
            <Avatar
              style={{ width: "5rem", height: "5rem" }}
              faceColor={user.faceColor}
              hairStyle={user.hairStyle}
              hatStyle={user.hatStyle}
              glassesStyle={user.glassesStyle}
              eyeBrowStyle={user.eyeBrowStyle}
              eyeStyle={user.eyeStyle}
              earSize={user.earSize}
              noseStyle={user.noseStyle}
              mouthStyle={user.mouthStyle}
              shirtStyle={user.shirtStyle}
              hairColor={user.hairColor}
              shirtColor={user.shirtColor}
              bgColor={user.bgColor}
              className="ms-auto me-auto"
            />
          </Col>
          <Col sm={10}>
            <Button
              variant="secondary"
              style={{ width: "100%", height: "80%" }}
              className="mt-1 fs-4"
              onClick={openModal}
            >
              What do you want to share...?
            </Button>
          </Col>
        </Row>
      </Form>
      <ModalMessage
        onShow={showModal}
        onHide={closeModal}
        style={{ zIndex: modalZIndex }}
      />
    </>
  );
}

export default Message;
