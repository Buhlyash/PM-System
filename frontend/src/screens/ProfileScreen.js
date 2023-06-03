import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Header from "../components/Header";
import HeaderSec from "../components/HeaderSec";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassord, setConsfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history("/");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassord) {
      setMessage("Пароли не совпадают!");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("");
    }
  };
  return (
    <div>
      {userInfo && <HeaderSec />}
      <main className="p-3">
        <Container>
          <Row>
            <Col md={3}>
              <h2>Пользователь</h2>

              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler} className="log-scr-m">
                <Form.Group controlId="name">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    required
                    type="name"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Электронная почта</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Введите почту"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="passwordConfirm">
                  <Form.Label>Повторите пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите повторно пароль"
                    value={confirmPassord}
                    onChange={(e) => setConsfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Обновить
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>  
  );
}

export default ProfileScreen;
