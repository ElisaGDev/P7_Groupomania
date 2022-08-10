import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink to="/">
        <img
          src="favicon.png"
          width="60"
          height="60"
          className="d-inline-block align-top"
          alt=""
        />
        <a href="/">Groupomania</a>
      </NavLink>
    </nav>
  );
}
