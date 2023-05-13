import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./ModalMessage.module.css";

function ModalMessage(props) {
  return (
    <Modal show={props.onShow} onHide={props.onHide} size="lg" animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input style={{ width: "100%" }} autoFocus></input>
      </Modal.Body>
      <Modal.Body>
        <input style={{ width: "100%" }}></input>
      </Modal.Body>
      <Modal.Body>
        <input style={{ width: "100%" }}></input>
      </Modal.Body>
      <Modal.Body>
        <input style={{ width: "100%" }}></input>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary">Post your articles</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMessage;
