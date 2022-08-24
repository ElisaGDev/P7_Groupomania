import React, { Fragment, useState } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";

export default function RegisterForm() {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}auth/register`, {
          pseudo,
          email,
          password,
        })
        .then((res) => {
          setFormSubmit(true);
        })
        .catch((err) => {
          pseudoError.innerHTML = err.response.data.errors.pseudo;
          emailError.innerHTML = err.response.data.errors.email;
          passwordError.innerHTML = err.response.data.errors.password;
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      {formSubmit ? (
        <>
          <LoginForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form
          action=""
          onSubmit={handleRegister}
          className="Auth-form"
          id="sign-up-form"
        >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">S'inscrire</h3>
            <div className="form-group mt-3">
              <label htmlFor="pseudo">Pseudo</label>
              <input
                type="text"
                name="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
                className="form-control mt-1"
                placeholder="Pseudo"
              />
              <div className="pseudo error"></div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control mt-1"
                placeholder="Email"
              />
              <div className="email error"></div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control mt-1"
                placeholder="Mot de passe"
              />
              <div className="password error"></div>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password-confirm">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password-confirm"
                onChange={(e) => setControlPassword(e.target.value)}
                value={controlPassword}
                className="form-control mt-1"
                placeholder="Mot de passe"
              />
              <div className="password-confirm error"></div>
            </div>
            <div className="form-group mt-3">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les{" "}
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  conditions générales
                </a>
              </label>
              <div className="terms error"></div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary submit text-white"
                value="Valider inscription"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      )}
    </Fragment>
  );
}
