import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    // Envoie de l'email et mot de passe au backend
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        window.location = "/";
      })
      // Voir si erreur
      .catch((err) => {
        emailError.innerHTML = err.response.data.errorEmail;
        passwordError.innerHTML = err.response.data.errorPassword;
        console.log(err);
      });
  };

  return (
    <form
      action=""
      className="Auth-form"
      onSubmit={handleLogin}
      id="sign-up-form"
    >
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Se connecter</h3>
        <div className="form-group mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control mt-1"
            placeholder="Entrez votre email"
          />
          <div className="email error"></div>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Mot de passe</label>
          <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            className="form-control mt-1"
            placeholder="Entrez votre mot de passe"
          />
          <div className="password error"></div>
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary text-white">
            Se connecter
          </button>
        </div>
      </div>
    </form>
  );
}
