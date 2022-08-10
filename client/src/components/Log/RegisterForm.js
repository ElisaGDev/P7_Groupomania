import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {};

  return (
    <form
      action=""
      onSubmit={handleRegister}
      className="Auth-form"
      id="sign-up-form"
    >
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">S'inscrire</h3>
        <div className="form-group mt-3">
          <label>Pseudo</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Pseudo"
          />
        </div>
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Email"
          />
        </div>
        <div className="form-group mt-3">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Mot de passe"
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            value="Valider inscription"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </form>
  );
}
