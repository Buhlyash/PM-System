import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

function LoginRegisterScreen() {
  const [key, setKey] = useState("login");

  return (
    <div className="log-reg-page">
      <div className="log-reg-width">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
      >
        <Tab eventKey="login" title="Войти">
          <LoginScreen stateChanger={setKey} />
        </Tab>
        <Tab eventKey="register" title="Зарегистрироваться">
          <RegisterScreen stateChanger={setKey} />
        </Tab>
      </Tabs>
      </div>
    </div>
  );
}

export default LoginRegisterScreen;
