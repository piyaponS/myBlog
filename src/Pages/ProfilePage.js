import React, { useState } from "react";
import Header from "../components/Header";
import Avatar from "react-nice-avatar";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SlSettings } from "react-icons/sl";
import Stack from "react-bootstrap/Stack";
import ModalProfile from "../components/ModalProfile";
import ModalProfileImage from "../components/ModalProfileImage";
import classes from "./ProfilePage.module.css";
import { BiEditAlt } from "react-icons/bi";

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);
  const [modalZIndex, setModalZIndex] = useState(0);
  const [showModalImage, setShowModalImage] = useState(false);
  const [modalImageZIndex, setModalImageZIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const openModal = () => {
    setShowModal(true);
    setModalZIndex(10);
  };
  const closeModal = () => {
    setShowModal(false);
    setModalZIndex(0);
  };

  const openModalImage = () => {
    setShowModalImage(true);
    setModalImageZIndex(10);
  };
  const closeModalImage = () => {
    setShowModalImage(false);
    setModalImageZIndex(0);
  };

  return (
    <>
      <Header />

      <Container>
        <Row style={{ backgroundColor: "#fff" }}>
          <div>
            <div className={classes.hover}>
              <Avatar
                style={{
                  width: "8rem",
                  height: "8rem",
                  border: "2px solid black",
                }}
                className="me-auto ms-auto mt-3"
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
              <Button
                variant="dark"
                style={{
                  border: "solid  ",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  position: "absolute",
                  bottom: "-8%",
                  right: "-8%",
                }}
                onClick={openModalImage}
              >
                <BiEditAlt style={{ fontSize: "20px" }} />
              </Button>
            </div>
            <Row>
              <Col sm="3"></Col>
              <Col sm="6">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  {user.name}
                </h2>
              </Col>
              <Col sm="3">
                <Stack direction="horizontal">
                  <Button
                    variant="secondary"
                    className="mt-2 ms-auto"
                    onClick={openModal}
                  >
                    <SlSettings className="mb-1 me-1" /> Edit Profile
                  </Button>
                </Stack>
              </Col>
            </Row>
          </div>
        </Row>
        <ModalProfile
          onShow={showModal}
          onHide={closeModal}
          style={{ zIndex: modalZIndex }}
        />
        <ModalProfileImage
          onShow={showModalImage}
          onHide={closeModalImage}
          style={{ zIndex: modalImageZIndex }}
        />
        <Row>
          <Col>
            <h1>Intro</h1>
            <p>Bio: {user.bio} </p>
            <Button>Edit details</Button>
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
