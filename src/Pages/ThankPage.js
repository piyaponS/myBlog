import React from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import classes from "./ThankyouPage.module.css";
import { BsCheck2Circle } from "react-icons/bs";

const ThankPage = () => {
  const navigate = useNavigate();
  const backToLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  return (
    <>
      <Header />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col className={classes.text}>
            <div className={classes.check}>
              <BsCheck2Circle />
            </div>
            <h1 className={classes.h1}>Thank You!</h1>
            <p className="lead">
              Your account has been created, get more reading your friend's
              articles and writing your owns.
            </p>
            <Button
              variant="dark"
              type="submit"
              size="lg"
              onClick={backToLogin}
            >
              Back to login page
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ThankPage;
