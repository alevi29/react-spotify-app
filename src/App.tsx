import CreateLinks from "./components/createLinks";
import SearchBar from "./components/search";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';
import { Fragment, useEffect, useState } from "react";
import Home from "./components/home";

function App() {

  return (
    <Fragment>
      <img src="iconSpotify.png" id="main-logo" alt="Spotify Logo" />

      <div id="title">
        STATIFY
      </div>

      <Home />

      <CreateLinks />
    </Fragment>
  );
}

export default App;
