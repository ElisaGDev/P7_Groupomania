import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <Navbar
      className="d-flex bd-highlight mb-3"
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="light"
    >
      <Container fluid>
        <Navbar.Brand>
          <NavLink to="/" className="navbar-brand fw-bold fs-2 text-white">
            <Image
              src="./img/logo2.png"
              width="15%"
              alt="icon"
              className="logo"
            />
            Groupomania
          </NavLink>
        </Navbar.Brand>
        {uid ? (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end navbar-toggler-focus-width-0"
            >
              <Nav>
                <Nav.Link href="/">
                  <Image src="img/icons/home.svg" alt="home" width="25" />
                </Nav.Link>

                <Nav.Link
                  href="/profil"
                  className="text-decoration-none fw-bold "
                >
                  <span className="text-white">{userData.pseudo} </span>
                  <Image
                    src={userData.picture}
                    width="30px"
                    className="avatar-nav img-xs rounded-circle "
                    alt="user-pic"
                  />
                </Nav.Link>

                <Logout />
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <ul className="nav navbar">
            <li className="nav-item"></li>
          </ul>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
