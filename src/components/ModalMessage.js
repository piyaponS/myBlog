import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classes from "./ModalMessage.module.css";
import Form from "react-bootstrap/Form";

function ModalMessage(props) {
  return (
    <Modal show={props.onShow} onHide={props.onHide} size="lg" animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Article Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Article Title"
              name="name"
              autoFocus
              autoComplete="off"
              className="mb-2"
            />
            <Form.Label>About</Form.Label>
            <Form.Control
              type="text"
              placeholder="What's this article about?"
              name="name"
              autoComplete="off"
              className="mb-2"
            />
            <Form.Label>Article Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              type="text"
              placeholder="Write your article"
              name="name"
              autoComplete="off"
              className="mb-2"
            />
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              name="name"
              autoComplete="off"
              className="mb-2"
            />
          </Form.Group>
        </Form>
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
