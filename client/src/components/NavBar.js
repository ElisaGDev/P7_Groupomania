import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink to="/">
        <img
          src="img/Logo.png"
          width="35%"
          className="d-inline-block align-top"
          alt=""
        />
      </NavLink>
    </nav>
  );
}
