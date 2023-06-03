import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen({stateChanger}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassord, setConsfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams("");
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/main";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassord) {
      setMessage("Пароли не совпадают!");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='log-scr-m'>
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
            required
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Введите повторно пароль"
            value={confirmPassord}
            onChange={(e) => setConsfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Зарегистрироваться
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Уже есть аккаунт?{" "}
          <Link onClick={() => stateChanger('login')}>
            Войти
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
