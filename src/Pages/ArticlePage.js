import React, { useEffect } from "react";
import Header from "../components/Header";
import Avatar from "react-nice-avatar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getProfileArticle } from "../features/articles/articlesSlice";
import classes from "./ArticlePage.module.css";

function ArticlePage() {
  const { article, loading, success, error, message } = useSelector(
    (state) => state.article
  );
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
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Row>
            <h1>{article.title}</h1>
          </Row>
          <Row>
            <Col sm="1">
              <Avatar
                style={{
                  width: "3rem",
                  height: "3rem",
                  border: "1px solid black",
                }}
                className="ms-auto mt-1"
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
            <Col>
              <Row style={{ fontSize: "20px", fontWeight: "bold" }}>
                {article.name}
              </Row>
              <Row>{convertTime(article.createdAt)}</Row>
            </Col>
            <Col></Col>
          </Row>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default ArticlePage;
