import ListGroup from "./components/listGroup";
import CreateLinks from "./components/createLinks";
import SearchBar from "./components/searchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import './App.css';
import { Fragment } from "react";

function App() {

  return (
    <Fragment>
      <img src="/iconSpotify.png" id="main-logo" />

      <div id="title">
        STATIFY
      </div>

      <div id="main-text">
        Begin by typing the name of an artist, song, or album!
      </div>

      <SearchBar />

      <Container>

      </Container>

      <CreateLinks />
    </Fragment>
  );
}

export default App;
