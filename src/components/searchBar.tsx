import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

// figure out how to hide this 
const CLIENT_ID = 'c45b05fac304496bb06b1d4595557bfc';
const CLIENT_SECRET = 'a4d832ecf25f4cee85d9daa40e7e3d73';

function SearchBar() {
    const [accessToken, setAccessToken] = useState("");
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        // API access token

        // Spotify exclusive param formatting
        var param = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        // fetch result and store into json file (output to console to debug, should display access token)
        fetch('https://accounts.spotify.com/api/token', param)
            .then(result => result.json())
            .then(data => {
                console.log(data.access_token);
                setAccessToken(data.access_token);
            })
    }, []);

    console.log("Access token: " + accessToken);

    async function search() {
        console.log("Searching for " + searchInput);

        // GET request: get artist ID
        var artistParam = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput
            + '&type=artist', artistParam)
            .then(response => response.json())
            .then(data => console.log(data));



        // GET request: use artist ID 
    }

    return (
        <Container>
            <InputGroup size="lg" className="mx-auto w-50 mb-3">

                <Button variant='light' onClick={() => alert("Button Clicked!")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>

                <FormControl
                    placeholder="What are you looking for?"
                    type="input"
                    onKeyPress={event => {
                        if (event.key == "Enter") {
                            search();
                        }
                    }}
                    onChange={event => setSearchInput(event.target.value)}
                />
            </InputGroup>
        </Container>

    )
}

export default SearchBar;