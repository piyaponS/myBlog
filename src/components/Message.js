import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Message.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalMessage from "./ModalMessage";
import { useState } from "react";

function Message() {
  const [showModal, setShowModal] = useState(false);
  const [modalZIndex, setModalZIndex] = useState(0);

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
        <div className="d-grid">
          <Row>
            <Col lg={2}></Col>
            <Col lg={10}>
              <Button
                variant="secondary"
                style={{ width: "100%" }}
                onClick={openModal}
              >
                What do you want to share...?
              </Button>
            </Col>
          </Row>
        </div>
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
