import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Avatar from "react-nice-avatar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner, Button, Form } from "react-bootstrap";
import { getProfileArticle } from "../features/articles/articlesSlice";
import {
  getComments,
  postComment,
  resetComments,
} from "../features/comments/commentSlice";
import classes from "./ArticlePage.module.css";
import { BsSend } from "react-icons/bs";
import CardComment from "../components/CardComment";

function ArticlePage() {
  const [comment, setComment] = useState("");
  const [numLines, setNumLines] = useState(1);
  const textareaRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { article, loading, success, error, message } = useSelector(
    (state) => state.article
  );
  const { comments } = useSelector((state) => state.comment);
  const navigate = useNavigate();
  const convertTime = (time) => {
    if (!time) {
      return "";
    }

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
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProfileArticle(slug));
    dispatch(getComments(slug));
  }, [slug]);

  const handleCommentChange = (event) => {
    const { value } = event.target;
    setComment(value);

    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  if (loading) {
    return (
      <div className={classes.spinner}>
        <Spinner
          size="lg"
          animation="grow"
          style={{ width: "60px", height: "60px" }}
        />
      </div>
    );
  }

  const profileHandler = () => {
    if (article.userId === user._id) {
      navigate(`/auth/profile/${article.userId}`);
    } else {
      navigate(`/auth/profile/friends/${article.userId}`);
    }
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(comment);
    dispatch(
      postComment({
        slug: slug,
        comments: {
          comment: comment,
          userId: user._id,
          username: user.name,
          faceColor: user.faceColor,
          hairStyle: user.hairStyle,
          hatStyle: user.hatStyle,
          glassesStyle: user.glassesStyle,
          eyeBrowStyle: user.eyeBrowStyle,
          eyeStyle: user.eyeStyle,
          earSize: user.earSize,
          noseStyle: user.noseStyle,
          mouthStyle: user.mouthStyle,
          shirtStyle: user.shirtStyle,
          hairColor: user.hairColor,
          shirtColor: user.shirtColor,
          bgColor: user.bgColor,
        },
      })
    );
    setComment("");
  };

  return (
    <div>
      <Header />
      <Container style={{ backgroundColor: "#ffffff" }}>
        <Row style={{ backgroundColor: "#ffffff", opacity: "0.98" }}>
          <Row className="mt-4">
            <h1>{article.title}</h1>
          </Row>
          <Row className="mb-3">
            <Col sm="1" onClick={profileHandler}>
              <Avatar
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  border: "1px solid black",
                  cursor: "pointer",
                }}
                className="ms-auto mt-2"
                faceColor={article.faceColor}
                hairStyle={article.hairStyle}
                hatStyle={article.hatStyle}
                glassesStyle={article.glassesStyle}
                eyeBrowStyle={article.eyeBrowStyle}
                eyeStyle={article.eyeStyle}
                earSize={article.earSize}
                noseStyle={article.noseStyle}
                mouthStyle={article.mouthStyle}
                shirtStyle={article.shirtStyle}
                hairColor={article.hairColor}
                shirtColor={article.shirtColor}
                bgColor={article.bgColor}
              />
            </Col>
            <Col sm="2">
              <Row
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <p style={{ margin: "0", padding: "0" }}>
                  <span onClick={profileHandler} style={{ cursor: "pointer" }}>
                    {article.name}
                  </span>
                </p>
              </Row>
              <Row>{convertTime(article.createdAt)}</Row>
            </Col>
            <Col sm="2">
              <Button className="mt-2">{article.favorited}</Button>
            </Col>
            <Col sm="2">
              <Button className="mt-2">+ Follow</Button>
            </Col>
          </Row>
        </Row>

        <Row className="mt-4" style={{ backgroundColor: "#ffffff" }}>
          <div>{article.description}</div>
          <div>{article.body}</div>
        </Row>
        <hr />

        <div
          style={{
            backgroundColor: comments.length > 0 ? "white" : "",
            width: comments.length > 0 ? "100%" : "",
            overflowY: comments.length > 0 ? "scroll" : "",
            height: comments.length > 0 ? "50vh" : "",
            position: comments.length > 0 ? "relative" : "",
          }}
        >
          {comments.length > 0 &&
            comments.map((comment, index) => {
              return <CardComment key={index} comment={comment.comment} />;
            })}
        </div>
        <div>
          <Form onSubmit={submitHandler}>
            <Form.Group
              style={{
                width: comments.length > 0 ? "100%" : "100%",
                padding: "0",
                borderRadius: "5px",
                backgroundColor: "#ffffff",
                position: "relative",
                bottom: comments.length > 0 ? "0" : "",
                zIndex: comments.length > 0 ? "100" : "",
              }}
              className="mt-3"
            >
              <Row>
                <Col sm="1">
                  <Avatar
                    style={{
                      width: "2rem",
                      height: "2rem",
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                    className=" mt-1 ms-5"
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
                  />
                </Col>
                <Col sm="10">
                  <Form.Control
                    style={{ backgroundColor: "#e7ecef", border: "none" }}
                    size="md"
                    as="textarea"
                    rows={numLines + 1}
                    placeholder="Leave a comment"
                    className="mb-3"
                    ref={textareaRef}
                    value={comment}
                    name={comment}
                    onChange={handleCommentChange}
                  />
                </Col>
                <Col sm="1">
                  <Button
                    variant="dark"
                    style={{
                      position: "absolute",
                      bottom: "15px",
                      right: "-1px",
                    }}
                    disabled={!comment ? true : false}
                    type="submit"
                    className="me-5"
                  >
                    <BsSend style={{ fontSize: "16px" }} />
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default ArticlePage;
