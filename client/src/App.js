import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Groupomania</h1>
      <nav class="nav">
        <Link to="/register">S'enregistrer</Link> |{" "}
        <Link to="/login">Se connecter</Link>
      </nav>
    </div>
  );
}
