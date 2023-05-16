import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Button, Row, Col, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import classes from "./SignupPage.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "./../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Avatar from "react-nice-avatar";
import { RxFace } from "react-icons/rx";
import { FaEye } from "react-icons/fa";
import { MdFace, MdOutlineFace5 } from "react-icons/md";
import { BsEyeglasses } from "react-icons/bs";
import { CgSmileMouthOpen } from "react-icons/cg";
import { IoShirtOutline } from "react-icons/io5";
import { GiNoseFront } from "react-icons/gi";
import { TbShirt } from "react-icons/tb";
import { SlFrame } from "react-icons/sl";

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

function SignupPage() {
  const [enteredData, setEnteredData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState({
    faceColor: "#F9C9B6",
    hairStyle: "normal",
    hatStyle: "none",
    eyeStyle: "circle",
    glassesStyle: "none",
    earSize: "small",
    noseStyle: "short",
    mouthStyle: "laugh",
    shirtStyle: "hoody",
    eyeBrowStyle: "up",
    hairColor: "#000",
    shirtColor: "#6BD9E9",

    bgColor: "linear-gradient(45deg, #178bff 0%, #ff6868 100%)",
  });

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

  const { name, email, password, confirmPassword } = enteredData;
  const { user, loading, success, error, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setEnteredData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    const userData = {
      name,
      email,
      password,
    };
    dispatch(register(userData));
  };

  useEffect(() => {
    if (error) {
      return;
    }
    if (user || success) {
      navigate("/thankyou");
    }
    dispatch(reset());
  }, [user, success, error, message, navigate, dispatch]);
  if (loading) {
    return (
      <div className={classes.spinner}>
        <Spinner animation="grow" size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Form className={classes.Form} onSubmit={submitHandler}>
        <h1 className={classes.h1}>Registration</h1>
        <p className={classes.p}>Create an account</p>
        <Row>
          <Col></Col>
          <Col>
            <Avatar
              style={{ width: "10rem", height: "10rem" }}
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
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-4 mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={changeHandler}
                value={enteredData.name}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={changeHandler}
                value={enteredData.email}
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={changeHandler}
                value={enteredData.password}
                name="password"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                onChange={changeHandler}
                value={enteredData.confirmPassword}
                name="confirmPassword"
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Row className="mt-3 mb-2">Avatar Profile Setting:</Row>
            <Row>
              <Col>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mb-3"
                    onClick={() => handleOptionChange("hairStyle")}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <MdFace />
                  </Button>
                  <div className={classes.text}>{profileImage.hairStyle}</div>
                </div>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mb-3"
                    onClick={() => handleOptionChange("glassesStyle")}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <BsEyeglasses />
                  </Button>

                  <div className={classes.text}>
                    {profileImage.glassesStyle}
                  </div>
                </div>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mb-3"
                    onClick={() => handleOptionChange("shirtStyle")}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <IoShirtOutline />
                  </Button>
                  <div className={classes.text}>{profileImage.shirtStyle}</div>
                </div>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mb-3"
                    onClick={() => handleOptionChange("eyeStyle")}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <FaEye />
                  </Button>
                  <div className={classes.text}>{profileImage.eyeStyle}</div>
                </div>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mb-3"
                    onClick={() => handleOptionChange("noseStyle")}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <GiNoseFront />
                  </Button>
                  <div className={classes.text}>{profileImage.noseStyle}</div>
                </div>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mb-3"
                    onClick={() => handleOptionChange("mouthStyle")}
                    style={{
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <CgSmileMouthOpen />
                  </Button>
                  <div className={classes.text}>{profileImage.mouthStyle}</div>
                </div>
              </Col>
              <Col>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    className="mb-3 mt-1"
                    onClick={() => handleOptionChange("hairColor")}
                    style={{
                      backgroundColor:
                        profileImage.hairStyle === "thick" ||
                        profileImage.hairStyle === "mohawk"
                          ? (profileImage.hairColor = "#000")
                          : profileImage.hairColor,
                      border: "none",
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
                <div className={classes["icon-wrapper"]}>
                  <Button
                    className="mb-3 "
                    onClick={() => handleOptionChange("faceColor")}
                    style={{
                      backgroundColor: profileImage.faceColor,
                      border: "none",
                    }}
                  >
                    <RxFace /> Face Color
                  </Button>
                </div>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    className="mb-3"
                    onClick={() => handleOptionChange("shirtColor")}
                    style={{
                      backgroundColor: profileImage.shirtColor,
                      border: "none",
                    }}
                  >
                    <TbShirt /> Shirt Color
                  </Button>
                </div>
                <div className={classes["icon-wrapper"]}>
                  <Button
                    className="mb-3 mt-2"
                    onClick={() => handleOptionChange("bgColor")}
                    style={{
                      backgroundImage: profileImage.bgColor.includes("linear")
                        ? profileImage.bgColor
                        : "none",
                      backgroundColor: profileImage.bgColor.includes("linear")
                        ? "none"
                        : profileImage.bgColor,
                      border: "none",
                    }}
                  >
                    <SlFrame /> Background Color
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="d-grid">
          <Button variant="dark" type="submit" size="md">
            Create User
          </Button>
        </div>

        <p className={classes.member}>
          Already have an account?<Link to="/login"> Login</Link>
        </p>
      </Form>
    </>
  );
}

export default SignupPage;
