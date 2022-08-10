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
        <ul className="nav justify-content-center">
          <li
            className="nav-item"
            onClick={handleModals}
            id="register"
            className={registerModal ? "nav-link" : null}
          >
            S'inscrire
          </li>
          <li
            className="nav-item"
            onClick={handleModals}
            id="login"
            className={loginModal ? "nav-link" : null}
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
