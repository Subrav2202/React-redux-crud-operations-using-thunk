import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Read,
  postUsersSuccess,
  deleteUsersSuccess,
  updateUsersSuccess,
} from "../Components/Store/Action";

function Home() {
  const history = useHistory();

  let test = [];
  const dispatch = useDispatch();

  let initialState = {
    id: "",
    name: "",
    username: "",
    email: "",
  };

  const [state, setstate] = useState(initialState);
  const [update, setupdate] = useState(false);
  const [updateto, setupdateto] = useState(initialState);

  const data = useSelector((state) => state);

  useEffect(() => {
    dispatch(Read());
  }, []);

  // console.log(data)/////data,it is an object,,,,users,it is an array ////////////////

  const createHandler = (e) => {
    const value = e.target.value;
    setstate({ ...state, [e.target.name]: value });
  };

  const submitHandler = (e) => {
    if (update) {
      modify(e);
    } else {
      e.preventDefault();
      data.users.push(state);
      dispatch(postUsersSuccess(data.users));
      setstate(initialState);
      alert("added new user");
    }
  };

  const updatehandler = (item) => {
    setupdate(true);
    updateto.id = item.id;
    updateto.name = item.name;
    updateto.username = item.username;
    updateto.email = item.email;
    deletehandler(item);
  };
  const modify = (e) => {
    e.preventDefault();
    data.users.push(state);
    dispatch(updateUsersSuccess(data.users));
    setupdateto(initialState);
    alert("updated");
  };

  const deletehandler = (item) => {
    for (let value of data.users) {
      if (value.id === item.id) {
        continue;
      }
      test.push(value);
    }
    console.log(test);
    dispatch(deleteUsersSuccess(test));
  };

  const signOutHandler = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end m-2">
        <Button variant="primary" onClick={signOutHandler}>
          SIGNOUT
        </Button>
      </div>
      <Container>
        <Row className="d-flex align-items-center" style={{ height: "100%" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <h3>Data manipulation by using JSON placeholder</h3>
            <Form>
              <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control
                  placeholder="Enter id"
                  type="text"
                  name="id"
                  // value={state.id}
                  onChange={createHandler}
                  defaultValue={update ? updateto.id : state.id}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  type="text"
                  name="name"
                  // value={state.name}
                  onChange={createHandler}
                  defaultValue={update ? updateto.name : state.name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  // value={state.username}
                  onChange={createHandler}
                  defaultValue={update ? updateto.username : state.username}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  // value={state.email}
                  onChange={createHandler}
                  defaultValue={update ? updateto.email : state.email}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Button type="submit" onClick={submitHandler}>
                  Add
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <Button onClick={() => updatehandler(item)}>Update</Button>
                </td>
                <td>
                  <Button onClick={() => deletehandler(item)}>delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
