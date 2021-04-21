import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState(false);
  //////////////////////////////registration////////////////
  const initialdata = {
    name: "",
    email: "",
    Password: "",
  };
  const [registerdata, setregisterdata] = useState(initialdata);

  const registerHandler = (e) => {
    const value = e.target.value;
    setregisterdata({ ...registerdata, [e.target.name]: value });
  };
  const register = (e) => {
    e.preventDefault();
    console.log(registerdata);
    localStorage.setItem("userdata", JSON.stringify(registerdata));
    setregisterdata(initialdata);
  };

  //////////////////////////////login////////////////

  const initiallogindata = {
    email: "",
    Password: "",
  };
  const [logindata, setlogindata] = useState(initiallogindata);

  const loginHandler = (e) => {
    const value = e.target.value;
    setlogindata({ ...logindata, [e.target.name]: value });
  };

  const history = useHistory();
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("userdata"));
    if(data !==null)
    {
      if (data.email === logindata.email) {
        console.log("hello");
        history.push("/home");
      } else {
        alert("you are not authorised user");
      }
    }
    else{
      alert("You have to register first !!!")
    }
  
  };

  return (
    <>
      <Container fluid className="screenwrapper">
        <Row className="d-flex align-items-center" style={{ height: "100%" }}>
          <Col md={{ span: 6, offset: 3 }}>
            {login ? (
              <Form className="formwrapper" onSubmit={register}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    value={registerdata.name}
                    onChange={registerHandler}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={registerdata.email}
                    onChange={registerHandler}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={registerdata.Password}
                    onChange={registerHandler}
                  />
                </Form.Group>
                <Form.Group className="d-flex justify-content-around">
                  <Button variant="primary" onClick={() => setLogin(!login)}>
                    login
                  </Button>
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </Form.Group>
              </Form>
            ) : (
              <Form className="formwrapper" onSubmit={loginSubmitHandler}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={logindata.email}
                    onChange={loginHandler}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={logindata.Password}
                    onChange={loginHandler}
                  />
                </Form.Group>
                <Form.Group className="d-flex justify-content-around">
                <Button variant="primary" type="submit">
                  login
                </Button>
                <Button variant="primary" onClick={() => setLogin(!login)}>
                  Register
                </Button>
                </Form.Group>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
