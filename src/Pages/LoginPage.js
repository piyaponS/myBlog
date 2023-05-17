import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function LoginPage() {
  const [enteredData, setEnteredData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = enteredData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, success, error, message } = useSelector(
    (state) => state.auth
  );
  const changeHandler = (event) => {
    setEnteredData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  useEffect(() => {
    if (error) {
      return;
    }
    if (user && success) {
      navigate("/auth");
    }
    dispatch(reset());
  }, [user, success, error, message, navigate, dispatch]);
  const submitHandler = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
    if (loading) {
      return <Spinner animation="grow" size="lg" />;
    }
  };

  return (
    <>
      <Header />

      <Form className={classes.Form} onSubmit={submitHandler}>
        <h1 className={classes.h1}>Login</h1>
        <p className={classes.p}>Login to continue</p>
        <Form.Group className="mb-3 mt-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={enteredData.email}
            onChange={changeHandler}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={enteredData.password}
            onChange={changeHandler}
          />
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
