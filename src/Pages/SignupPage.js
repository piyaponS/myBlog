import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./SignupPage.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "./../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function SignupPage() {
  const [enteredData, setEnteredData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
        <Form.Group className="mb-3 mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={changeHandler}
            value={enteredData.name}
            name="name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={changeHandler}
            value={enteredData.email}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
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
