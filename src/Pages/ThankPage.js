import React, { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./ThankyouPage.module.css";
import { BsCheck2Circle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";

const ThankPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
  });

  return (
    <>
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
            <a href="/login">
              <Button variant="dark" type="submit" size="lg">
                Back to login page
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ThankPage;
