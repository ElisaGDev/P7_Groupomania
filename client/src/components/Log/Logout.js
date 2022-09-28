import React from "react";
import axios from "axios";
//Permet de retirer les cookies quand on se logout
import cookie from "js-cookie";
import NavLink from "react-bootstrap/NavLink";

export default function Logout() {
  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    // Retrait du cookie en back
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/logout`, {
        withCredentials: true,
      })
      // Retrait du cookie en front
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    window.location = "/";
  };
  return (
    <NavLink onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" width="25" />
      <span className="text-white">Se déconnecter</span>
    </NavLink>
  );
}
