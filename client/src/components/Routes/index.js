import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import NotFound from "../../pages/NotFound";

import NavBar from "../NavBar";

function Index() {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default Index;
