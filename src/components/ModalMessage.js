import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArticles, postArticle } from "../features/articles/articlesSlice";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function ModalMessage(props) {
  const [enteredData, setEnteredData] = useState({
    title: "",
    description: "",
    body: "",
    taglist: "",
  });
  const changeHandler = (event) => {
    setEnteredData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const { title, description, body, taglist } = enteredData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.article);
  const submitHandler = (event) => {
    event.preventDefault();
    const articleData = {
      title,
      description,
      body,
      taglist,
    };
    dispatch(postArticle(articleData));
    setEnteredData({
      title: "",
      description: "",
      body: "",
      taglist: "",
    });
    if (loading) {
      return <Spinner animation="border" size="lg" />;
    }
    window.location.reload();
  };
  useEffect(() => {
    if (error) {
      return;
    }
    dispatch(getArticles());
  }, [error, message, dispatch, navigate]);
  return (
    <Modal show={props.onShow} onHide={props.onHide} size="lg" animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Article Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Article Title"
              name="title"
              autoFocus
              autoComplete="off"
              className="mb-2"
              value={enteredData.title}
              onChange={changeHandler}
            />
            <Form.Label>About</Form.Label>
            <Form.Control
              type="text"
              placeholder="What's this article about?"
              name="description"
              autoComplete="off"
              className="mb-2"
              value={enteredData.description}
              onChange={changeHandler}
            />
            <Form.Label>Article Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              type="text"
              placeholder="Write your article"
              name="body"
              autoComplete="off"
              className="mb-2"
              value={enteredData.body}
              onChange={changeHandler}
            />
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              name="taglist"
              autoComplete="off"
              className="mb-2"
              value={enteredData.taglist}
              onChange={changeHandler}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Post your articles
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalMessage;
