import CreateLinks from "./components/createLinks";
import SearchBar from "./components/search";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Home from "./components/home";

function App() {

  return (
    <Fragment>
      <img src="iconSpotify.png" id="main-logo" alt="Spotify Logo" />


      <div id="title">
        <Link to="/react-spotify-app/" id="title-link">
          STATIFY
        </Link>
      </div>


      <Routes>
        <Route path="/react-spotify-app" element={<Home />} />
      </Routes>


      <CreateLinks />
    </Fragment>
  );
}

export default App;
