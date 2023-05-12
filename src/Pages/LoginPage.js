import React from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <Header />

      <Form className={classes.Form}>
        <h1 className={classes.h1}>Login</h1>
        <p className={classes.p}>Login to continue</p>
        <Form.Group className="mb-3 mt-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className="d-grid">
          <Button variant="dark" type="submit" size="md">
            Login
          </Button>
        </div>

        <p className={classes.member}>
          Not a member?<Link to="/signup"> Sign up now</Link>
        </p>
      </Form>
    </>
  );
}

export default LoginPage;
