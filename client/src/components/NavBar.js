import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

export default function NavBar() {
  const userId = useContext(UidContext);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <NavLink end to="/" className="navbar-brand fw-bold fs-2 text-primary">
          <img src="img/Logo.png" width="20%" className="" alt="logo" />
          Groupomania
        </NavLink>
        {userId.userId !== null ? (
          <ul className="nav navbar">
            <li className="nav-item"></li>
            <li className="nav-item me-3">
              <NavLink end to="/profil">
                <span>Bienvenue {userId.pseudo} </span>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul className="nav navbar">
            <li className="nav-item">
              <NavLink end to="/profil">
                <img
                  src="./img/logout.svg"
                  alt="login"
                  width="20px"
                  height="20px"
                />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
