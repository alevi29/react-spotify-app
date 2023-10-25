import SearchBar from "./search";
import { Fragment } from 'react';
import '/src/App.css';

function Home() {
    return (
        <Fragment>
            <div id="main-text">
                Begin by typing the name of an artist, song, or album!
            </div>
            <SearchBar />
        </Fragment>
    );
}

export default Home;