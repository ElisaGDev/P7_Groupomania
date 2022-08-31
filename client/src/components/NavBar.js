import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="logo">
          <NavLink to="/" className="navbar-brand fw-bold fs-2 text-primary">
            <img src="./img/logo.png" width="20%" alt="icon" />
            Groupomania
          </NavLink>
        </div>
        {uid ? (
          <ul className="nav navbar">
            <li className="nav-item">
              <NavLink to="/">
                <img src="img/icons/home.svg" alt="home" />
              </NavLink>
            </li>
            <li className="nav-item me-3">
              <NavLink to="/profil">
                <span>{userData.pseudo} </span>
                <img
                  src={userData.picture}
                  width="30px"
                  className="img-xs rounded-circle"
                  alt="user-pic"
                />
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul className="nav navbar">
            <li className="nav-item"></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
