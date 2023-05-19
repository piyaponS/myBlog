import { Modal, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

function ModalProfile(props) {
  const { user } = useSelector((state) => state.auth);
  const [enteredData, setEnteredData] = useState({
    name: user.name,
    bio: user.bio,
  });

  const { name, bio } = enteredData;

  const submitHandler = (event) => {
    event.preventDefault();
  };
  const changeHandler = (event) => {};
  return (
    <>
      <Modal
        show={props.onShow}
        onHide={props.onHide}
        size="lg"
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="name"
                autoFocus
                autoComplete="off"
                className="mb-2"
                value={enteredData.name}
                onChange={changeHandler}
              />
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Describe yourself..."
                name="bio"
                autoComplete="off"
                className="mb-2"
                value={enteredData.bio}
                onChange={changeHandler}
                style={{ height: "100px" }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalProfile;
