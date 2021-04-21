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
} from "../Components/Store/Action";

function Home() {
  const history = useHistory();

  let test = [];
  const dispatch = useDispatch();

  let initialState = {
    name: "",
    username: "",
    email: "",
  };

  const [state, setState] = useState(initialState);
  const [update, setupdate] = useState(false);
  const [index, setIndex] = useState()

  const data = useSelector((state) => state);

  useEffect(() => {
    dispatch(Read());
  }, [dispatch]);

  // console.log(data)/////data,it is an object,,,,users,it is an array ////////////////
  ////////////////////////////////////Add///////////////////////////////////////////////

  const createHandler = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  const submitHandler = (e) => {
    if (update) {
      modify(e);
    } else {
      e.preventDefault();
      validations();
    }
  };

  const validations = () => {
    let email = state.email.toLowerCase();
    let filter = data.users.filter(
      (user) => user.email.toLowerCase() === email
    );
    if (filter.length) {
      alert("user already exist");
      setState(initialState);
      return;
    }
    data.users.push(state);
    dispatch(postUsersSuccess(data.users));
    setState(initialState);
    alert("added new user");
  };

  //////////////////////////////update functionality/////////////////////////////////

  const updatehandler = (item,index) => {
    setupdate(true)
    setState(prevState=>({
      ...prevState,
      name:item.name,
      username:item.username,
      email:item.email
    })
    )
    // state.id = item.id;
    // state.name = item.name;
    // state.username = item.username;
    // state.email = item.email;
    setIndex(index)
  
  };
  const modify = (e) => {
    e.preventDefault();
    data.users.splice(index,1,state)
    setState(initialState);
    setupdate(false);
    // alert("updated");
  };

  //////////////////////////////delete functionality/////////////////////////////////

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

  //////////////////////////////sign out  functionality/////////////////////////////////

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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={createHandler}
                  // defaultValue={update ? updateto.name : state.name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Enter username"
                  type="text"
                  name="username"
                  value={state.username}
                  onChange={createHandler}
                  // defaultValue={update ? updateto.username : state.username}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={state.email}
                  onChange={createHandler}
                  // defaultValue={update ? updateto.email : state.email}
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
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <Button onClick={() => updatehandler(item,index)}>Update</Button>
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
