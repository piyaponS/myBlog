import React from "react";
import Header from "../components/Header";
import { Col, Row, Image } from "react-bootstrap";
import bgHome from "../bgHome.jpg";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section>
      <Header />
      <Row className={classes.background}>
        <Col sm="6"></Col>
        <Col sm="6"></Col>
      </Row>
    </section>
  );
};
export default HomePage;
