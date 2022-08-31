import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Navbar from "../NavBar";

const index = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
};

export default index;
