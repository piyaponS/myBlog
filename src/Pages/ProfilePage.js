import React from "react";
import Header from "../components/Header";
import Avatar from "react-nice-avatar";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Header />

      <Container>
        <Row style={{ backgroundColor: "#fff" }}>
          <div>
            <Avatar
              style={{
                width: "8rem",
                height: "8rem",
                border: "2px solid black",
              }}
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
              className="ms-auto me-auto mt-5"
            />
            <h2 style={{ textAlign: "center", marginTop: "10px" }}>
              {user.name}
            </h2>
          </div>
        </Row>
        <Row>
          <h1>Hello</h1>
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
