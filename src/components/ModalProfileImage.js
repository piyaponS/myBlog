import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import Avatar from "react-nice-avatar";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { RxFace } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import { MdFace, MdOutlineFace5 } from "react-icons/md";
import { BsEyeglasses } from "react-icons/bs";
import { CgSmileMouthOpen } from "react-icons/cg";
import { IoShirtOutline } from "react-icons/io5";
import { GiNoseFront } from "react-icons/gi";
import { TbShirt } from "react-icons/tb";
import { SlFrame } from "react-icons/sl";
import { updateUser, reset } from "../features/auth/authSlice";

function ModalProfileImage(props) {
  const { user, success, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [pressed, setPressed] = React.useState({
    hairStyle: false,
    glassesStyle: false,
    shirtStyle: false,
    eyeStyle: false,
    noseStyle: false,
    mouthStyle: false,
  });

  const handlePress = (property) => {
    setPressed((prevState) => ({
      ...prevState,
      [property]: !prevState[property],
    }));
    setTimeout(() => {
      setPressed((prevState) => ({
        ...prevState,
        [property]: false,
      }));
    }, 100);
  };

  const springPropsHairStyle = useSpring({
    scale: pressed.hairStyle ? 1.8 : 1,
  });

  const springPropsglassesStyle = useSpring({
    scale: pressed.glassesStyle ? 1.8 : 1,
  });

  const springPropsShirtStyle = useSpring({
    scale: pressed.shirtStyle ? 1.8 : 1,
  });

  const springPropsEyeStyle = useSpring({
    scale: pressed.eyeStyle ? 1.8 : 1,
  });

  const springPropsnoseStyle = useSpring({
    scale: pressed.noseStyle ? 1.8 : 1,
  });

  const springPropsmouthStyle = useSpring({
    scale: pressed.mouthStyle ? 1.8 : 1,
  });

  const faceColorOptions = ["#F9C9B6", "#AC6651"];
  const hairStyleOptions = [
    "normal",
    "thick",
    "mohawk",
    "womanLong",
    "womanShort",
  ];
  const hatStyleOptions = ["none"];
  const glassesStyleOptions = ["round", "square", "none"];
  const eyeStyleOptions = ["circle", "oval", "smile"];

  const noseStyleOptions = ["short", "long", "round"];
  const mouthStyleOptions = ["laugh", "smile", "peace"];
  const shirtStyleOptions = ["hoody", "short", "polo"];

  const shirtColorOptions = [
    "#6BD9E9",
    "#77311D",
    "#9287FF",
    "#FC909F",
    "#F4D150",
    "#ff6868",
    "#ff56f3",
    "#74D154",
    "#176ffd",
  ];
  const hairColorOptions = [
    "#000",
    "#F48150",
    "#FC909F",
    "#506AF4",
    "#77311D",
    "#ff6868",
    "#36cd1c",
    "#ff56f7",
  ];
  const bgColorOptions = [
    "linear-gradient(45deg, #178bff 0%, #ff6868 100%)",
    "#9287FF",
    "linear-gradient(45deg, #1729ff 0%, #ff56f7 100%)",
    "#F48150",
    "#ff56f2",
    "#74D153",
    "linear-gradient(90deg, #36cd1c 0%, #68deff 100%)",
    "linear-gradient(45deg, #176fff 0%, #68ffef 100%)",
    "#178bff",
    "linear-gradient(45deg, #ff1717 0%, #ffd368 100%)",
    "linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)",
    "#ffd368 ",
  ];

  const [profileImage, setProfileImage] = useState({
    faceColor: user.faceColor,
    hairStyle: user.hairStyle,
    hatStyle: user.hatStyle,
    eyeStyle: user.eyeStyle,
    glassesStyle: user.glassesStyle,
    earSize: user.earSize,
    noseStyle: user.noseStyle,
    mouthStyle: user.mouthStyle,
    shirtStyle: user.shirtStyle,
    eyeBrowStyle: user.eyeBrowStyle,
    hairColor: user.hairColor,
    shirtColor: user.shirtColor,
    bgColor: user.bgColor,
  });

  const {
    faceColor,
    hairStyle,
    hatStyle,
    glassesStyle,
    eyeBrowStyle,
    eyeStyle,
    earSize,
    noseStyle,
    mouthStyle,
    shirtStyle,
    hairColor,
    shirtColor,
    bgColor,
  } = profileImage;

  const handleOptionChange = (property) => {
    setProfileImage((prevState) => {
      const options = {
        faceColor: faceColorOptions,
        hairStyle: hairStyleOptions,
        hatStyle: hatStyleOptions,
        glassesStyle: glassesStyleOptions,
        eyeStyle: eyeStyleOptions,
        noseStyle: noseStyleOptions,
        mouthStyle: mouthStyleOptions,
        shirtStyle: shirtStyleOptions,
        hairColor: hairColorOptions,
        shirtColor: shirtColorOptions,
        bgColor: bgColorOptions,
      };
      const optionsLength = {
        faceColor: options.faceColor.length,
        hairStyle: options.hairStyle.length,
        hatStyle: options.hatStyle.length,
        glassesStyle: options.glassesStyle.length,
        eyeStyle: options.eyeStyle.length,
        noseStyle: options.noseStyle.length,
        mouthStyle: options.mouthStyle.length,
        shirtStyle: options.shirtStyle.length,
        hairColor: options.hairColor.length,
        shirtColor: options.shirtColor.length,
        bgColor: options.bgColor.length,
      };
      const currentIndex = options[property].indexOf(prevState[property]);
      const nextIndex = (currentIndex + 1) % optionsLength[property];
      const nextOption = options[property][nextIndex];
      return {
        ...prevState,
        [property]: nextOption,
      };
    });
  };
  const updateHandler = (event) => {
    event.preventDefault();
    const updateData = {
      faceColor,
      hairStyle,
      hatStyle,
      glassesStyle,
      eyeBrowStyle,
      eyeStyle,
      earSize,
      noseStyle,
      mouthStyle,
      shirtStyle,
      hairColor,
      shirtColor,
      bgColor,
    };
    dispatch(updateUser(updateData));
  };
  useEffect(() => {
    if (error) {
      console.error(message);
    }
    if (success) {
      window.location.reload();
      dispatch(reset());
    }
  }, [dispatch, error, message, success]);

  return (
    <>
      <Modal
        show={props.onShow}
        onHide={props.onHide}
        size="lg"
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Image</Modal.Title>
        </Modal.Header>

        <Form onSubmit={updateHandler}>
          <Modal.Body>
            <Avatar
              style={{
                width: "8em",
                height: "8rem",
                border: "solid 1px black",
              }}
              faceColor={profileImage.faceColor}
              hairStyle={profileImage.hairStyle}
              hatStyle={profileImage.hatStyle}
              glassesStyle={profileImage.glassesStyle}
              eyeBrowStyle={profileImage.eyeBrowStyle}
              eyeStyle={profileImage.eyeStyle}
              earSize={profileImage.earSize}
              noseStyle={profileImage.noseStyle}
              mouthStyle={profileImage.mouthStyle}
              shirtStyle={profileImage.shirtStyle}
              hairColor={profileImage.hairColor}
              shirtColor={profileImage.shirtColor}
              bgColor={profileImage.bgColor}
              className="ms-auto me-auto"
            />
            <h4>Styles</h4>
            <Row
              style={{
                border: "solid 1px",
                borderRadius: "10px",
                padding: "5px",
                position: "relative",
              }}
              className="mb-3 ms-3 me-3"
            >
              <Col style={{ textAlign: "center" }}>
                <animated.div style={springPropsHairStyle}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 mb-1"
                    onClick={() => {
                      handleOptionChange("hairStyle");
                      handlePress("hairStyle");
                    }}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <MdFace />
                  </Button>
                </animated.div>
                <div>{profileImage.hairStyle}</div>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <animated.div style={springPropsglassesStyle}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 mb-1"
                    onClick={() => {
                      handleOptionChange("glassesStyle");
                      handlePress("glassesStyle");
                    }}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <BsEyeglasses />
                  </Button>
                </animated.div>
                <div>{profileImage.glassesStyle}</div>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <animated.div style={springPropsShirtStyle}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 mb-1"
                    onClick={() => {
                      handleOptionChange("shirtStyle");
                      handlePress("shirtStyle");
                    }}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <IoShirtOutline />
                  </Button>
                </animated.div>
                <div>{profileImage.shirtStyle}</div>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <animated.div style={springPropsEyeStyle}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 mb-1"
                    onClick={() => {
                      handleOptionChange("eyeStyle");
                      handlePress("eyeStyle");
                    }}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <FaEye />
                  </Button>
                </animated.div>
                <div>{profileImage.eyeStyle}</div>
              </Col>

              <Col style={{ textAlign: "center" }}>
                <animated.div style={springPropsnoseStyle}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 mb-1"
                    onClick={() => {
                      handleOptionChange("noseStyle");
                      handlePress("noseStyle");
                    }}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <GiNoseFront />
                  </Button>
                </animated.div>
                <div>{profileImage.noseStyle}</div>
              </Col>
              <Col style={{ textAlign: "center" }}>
                <animated.div style={springPropsmouthStyle}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-2 mb-1"
                    onClick={() => {
                      handleOptionChange("mouthStyle");
                      handlePress("mouthStyle");
                    }}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <CgSmileMouthOpen />
                  </Button>
                </animated.div>
                <div>{profileImage.mouthStyle}</div>
              </Col>
            </Row>
            <h4 className="mt-4">Color Styles</h4>
            <Row
              style={{
                border: "solid 1px",
                borderRadius: "10px",
                padding: "5px",
                position: "relative",
              }}
              className=" mb-3 ms-3 me-3"
            >
              <Col>
                <div>
                  <Button
                    className="mb-3 mt-3"
                    onClick={() => handleOptionChange("hairColor")}
                    style={{
                      backgroundColor:
                        profileImage.hairStyle === "thick" ||
                        profileImage.hairStyle === "mohawk"
                          ? (profileImage.hairColor = "#000")
                          : profileImage.hairColor,
                      border: "none",
                      fontSize: "13px",
                    }}
                  >
                    <MdOutlineFace5 /> Hair Color
                  </Button>
                </div>

                <div style={{ color: "red" }}>
                  {profileImage.hairStyle === "thick" ||
                  profileImage.hairStyle === "mohawk"
                    ? "(If you select thick or mohawk styles, the hair color has to be black.)"
                    : ""}
                </div>
              </Col>
              <Col>
                <div>
                  <Button
                    className="mb-3 mt-3"
                    onClick={() => handleOptionChange("faceColor")}
                    style={{
                      backgroundColor: profileImage.faceColor,
                      border: "none",
                      fontSize: "13px",
                    }}
                  >
                    <RxFace /> Face Color
                  </Button>
                </div>
              </Col>
              <Col>
                <div>
                  <Button
                    className="mb-3 mt-3"
                    onClick={() => handleOptionChange("shirtColor")}
                    style={{
                      backgroundColor: profileImage.shirtColor,
                      border: "none",
                      fontSize: "13px",
                    }}
                  >
                    <TbShirt /> Shirt Color
                  </Button>
                </div>
              </Col>
              <Col>
                <div>
                  <Button
                    className="mb-3 mt-3"
                    onClick={() => handleOptionChange("bgColor")}
                    style={{
                      backgroundImage: profileImage.bgColor.includes("linear")
                        ? profileImage.bgColor
                        : "none",
                      backgroundColor: profileImage.bgColor.includes("linear")
                        ? "none"
                        : profileImage.bgColor,
                      border: "none",
                      fontSize: "13px",
                    }}
                  >
                    <SlFrame /> Background Color
                  </Button>
                </div>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Update Profile Image
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModalProfileImage;
