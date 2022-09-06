import React from "react";
import axios from "axios";
import cookie from "js-cookie";

export default function Logout() {
  const removeCookie = (key) => {
    if (window !== undefined) {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/logout`, {
        withCredentials: true,
      })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    window.location = "/profil";
  };
  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" className="pe-auto" alt="logout" />
    </li>
  );
}