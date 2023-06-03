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
import { login } from "../actions/userActions";
import { listUsersProjects } from "../actions/productActions";

function LoginScreen({stateChanger}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "/main";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history(redirect);
      dispatch(listUsersProjects());
    }
  }, [userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='log-scr-m'>
        <Form.Group controlId="email">
          <Form.Label>Электронная почта</Form.Label>
          <Form.Control
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

        <Button type="submit" variant="primary">
          Войти
        </Button>
      </Form>
      {/* Был внутри компонента Link  */}
      {/* to={redirect ? `/register?redirect=${redirect}` : "register"} */}
      <Row className="py-3">
        <Col>
          Новый пользователь?{" "}
          <Link onClick={() => stateChanger('register')}>
            Зарегистрироваться
          </Link>
        </Col>
      </Row>

      <br></br>
    </FormContainer>
  );
}

export default LoginScreen;
