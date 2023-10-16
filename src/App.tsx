import CreateLinks from "./components/createLinks";
import SearchBar from "./components/searchBar";
import SearchCard from "./components/searchCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.css';
import { Fragment } from "react";

function App() {

  return (
    <Fragment>
      <img src="iconSpotify.png" id="main-logo" />

      <div id="title">
        STATIFY
      </div>

      <div id="main-text">
        Begin by typing the name of an artist, song, or album!
      </div>

      <SearchBar />

      <Container className="search-card">
        <SearchCard />
      </Container>

      <CreateLinks />
    </Fragment>
  );
}

export default App;
