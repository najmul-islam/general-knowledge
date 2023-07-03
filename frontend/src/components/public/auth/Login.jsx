import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../../redux/features/auth/authSlice";
import Loading from "../others/Loading";

import { Row, Col, Form, Button } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  console.log("user", user);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "MODERATOR") {
        navigate("/moderator");
      } else if (user.role === "USER") {
        navigate("/user");
      } else {
        navigate("/");
      }
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) return <Loading />;
  return (
    <Row className="justify-content-center">
      <Col xs lg={4}>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
