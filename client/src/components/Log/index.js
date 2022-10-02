import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Log(props) {
  const [registerModal, setRegisterModal] = useState(props.register);
  const [loginModal, setLoginModal] = useState(props.login);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setRegisterModal(true);
    } else if (e.target.id === "login") {
      setRegisterModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div className="Auth-form-container">
      <div>
        <ul className="nav nav-tabs">
          <li
            onClick={handleModals}
            id="register"
            className={registerModal ? " text-primary me-4" : "mx-3"}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={loginModal ? "text-primary ms-4" : "mx-3"}
          >
            Se connecter
          </li>
        </ul>
      </div>
      {loginModal && <LoginForm />}
      {registerModal && <RegisterForm />}
    </div>
  );
}
