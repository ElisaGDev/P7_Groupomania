import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import NotFound from "../../pages/NotFound";
import NavBar from "../NavBar";

function index() {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default index;
