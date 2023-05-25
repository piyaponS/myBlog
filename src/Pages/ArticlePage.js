import React, { useEffect } from "react";
import Header from "../components/Header";
import Avatar from "react-nice-avatar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner, Button, Form } from "react-bootstrap";
import { getProfileArticle } from "../features/articles/articlesSlice";
import classes from "./ArticlePage.module.css";

function ArticlePage() {
  const { user } = useSelector((state) => state.auth);
  const { article, loading, success, error, message } = useSelector(
    (state) => state.article
  );
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
  }, [slug]);
  if (loading) {
    return (
      <div className={classes.spinner}>
        <Spinner
          size="lg"
          animation="border"
          style={{ width: "80px", height: "80px" }}
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
  return (
    <>
      <Header />
      <Container>
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
          </Row>
        </Row>
        <Row className="mt-4">
          <div>{article.description}</div>
          <div>{article.body}</div>
        </Row>
        <hr />
        <Row>
          <Col>
            <Button>H</Button>
          </Col>
          <Col>
            <Button>J</Button>
          </Col>
        </Row>
        <Row>
          <Form.Group
            style={{
              border: "solid 0.2px",
              width: "45%",
              margin: "auto auto",
              padding: "0",
              borderRadius: "5px",
            }}
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{
                height: "80px",
                width: "100%",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            />
            <Row style={{ height: "40px", width: "100%", margin: "0" }}>
              <Col>
                <Avatar
                  style={{
                    width: "2rem",
                    height: "2rem",
                    border: "1px solid black",
                    cursor: "pointer",
                  }}
                  className=" mt-1"
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
              <Col>
                <Button>H</Button>
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </Container>
    </>
  );
}

export default ArticlePage;
