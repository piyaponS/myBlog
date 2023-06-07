import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriends } from "../features/friends/friendSlice";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import Avatar from "react-nice-avatar";
import Header from "../components/Header";
import { BiEditAlt } from "react-icons/bi";
import classes from "./ProfileFriendsPage.module.css";

function ProfilePage() {
  const [showFullContent, setShowFullContent] = useState(false);
  const dispatch = useDispatch();
  const { username } = useParams();
  const { friend, loading, error } = useSelector((state) => state.friend);
  useEffect(() => {
    dispatch(getFriends(username));
  }, [username, dispatch]);

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

  if (error) {
    return <p>Error occurred while fetching friend data.</p>;
  }
  const clickHandler = (event) => {
    console.log(showFullContent);
    setShowFullContent(true);
    console.log(showFullContent);
  };

  return (
    <>
      <Header />

      <Container>
        <Row style={{ backgroundColor: "#fff" }}>
          <div>
            <div className={classes.hover}>
              {!friend && loading}
              {friend && (
                <Avatar
                  style={{
                    width: "8rem",
                    height: "8rem",
                    border: "2px solid black",
                  }}
                  className="me-auto ms-auto mt-3"
                  faceColor={friend.getUserProfile.faceColor}
                  hairStyle={friend.getUserProfile.hairStyle}
                  hatStyle={friend.getUserProfile.hatStyle}
                  glassesStyle={friend.getUserProfile.glassesStyle}
                  eyeBrowStyle={friend.getUserProfile.eyeBrowStyle}
                  eyeStyle={friend.getUserProfile.eyeStyle}
                  earSize={friend.getUserProfile.earSize}
                  noseStyle={friend.getUserProfile.noseStyle}
                  mouthStyle={friend.getUserProfile.mouthStyle}
                  shirtStyle={friend.getUserProfile.shirtStyle}
                  hairColor={friend.getUserProfile.hairColor}
                  shirtColor={friend.getUserProfile.shirtColor}
                  bgColor={friend.getUserProfile.bgColor}
                />
              )}
              <Button
                variant="dark"
                style={{
                  border: "solid",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  position: "absolute",
                  bottom: "-8%",
                  right: "-8%",
                }}
              >
                <BiEditAlt style={{ fontSize: "20px" }} />
              </Button>
            </div>
            <Row>
              <Col sm="3"></Col>
              <Col sm="6">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  {friend && friend.getUserProfile.name}
                </h2>
              </Col>
              <Col sm="3"></Col>
            </Row>
          </div>
        </Row>

        <Row>
          <Col>
            <h1>Intro</h1>
            <p>Bio: {friend && friend.getUserProfile.bio}</p>
            <Button>Edit details</Button>
          </Col>
          <Col>
            {friend &&
              friend.getArticles.map((article) => (
                <Card key={article._id} className="mt-3">
                  <Card.Header>{article.title}</Card.Header>
                  <Card.Body>
                    {showFullContent
                      ? article.body
                      : article.body.slice(0, 400)}
                    {!showFullContent && article.body.length > 400 && (
                      <Button
                        variant="link"
                        onClick={() => clickHandler(article._id)}
                      >
                        ...more
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
