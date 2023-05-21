import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriends } from "../features/friends/friendSlice";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Avatar from "react-nice-avatar";
import Header from "../components/Header";
import { BiEditAlt } from "react-icons/bi";
import classes from "./ProfileFriendsPage.module.css";

function ProfilePage() {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { friend, loading, error } = useSelector((state) => state.friend);
  useEffect(() => {
    dispatch(getFriends(username));
  }, [username]);

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
                  faceColor={friend.faceColor}
                  hairStyle={friend.hairStyle}
                  hatStyle={friend.hatStyle}
                  glassesStyle={friend.glassesStyle}
                  eyeBrowStyle={friend.eyeBrowStyle}
                  eyeStyle={friend.eyeStyle}
                  earSize={friend.earSize}
                  noseStyle={friend.noseStyle}
                  mouthStyle={friend.mouthStyle}
                  shirtStyle={friend.shirtStyle}
                  hairColor={friend.hairColor}
                  shirtColor={friend.shirtColor}
                  bgColor={friend.bgColor}
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
                  {friend && friend.name}
                </h2>
              </Col>
              <Col sm="3"></Col>
            </Row>
          </div>
        </Row>

        <Row>
          <Col>
            <h1>Hello</h1>
          </Col>
          <Col>
            <h1>Hello</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
