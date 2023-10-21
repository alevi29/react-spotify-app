import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, ButtonGroup, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '/src/styles.css';

// figure out how to hide this 
const CLIENT_ID = 'c45b05fac304496bb06b1d4595557bfc';
const CLIENT_SECRET = 'a4d832ecf25f4cee85d9daa40e7e3d73';

function SearchBar() {
    const [accessToken, setAccessToken] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [artists, setArtists] = useState<any[]>([]);

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
                setAccessToken(data.access_token);
            })
    }, []);

    useEffect(() => {
        if (searchInput != "") {
            search();
        }
    }, [searchInput])

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

        // retrieve list of artists from API and store in variable artists
        var artistItems = await fetch('https://api.spotify.com/v1/search?q=' + searchInput
            + '&type=artist&limit=50', artistParam)
            .then(response => response.json())
            .then(data => {
                setArtists(data.artists.items);
                return data.artists.items;
            });

        console.log(artistItems);

        // GET request: use artist ID 
    }

    return (
        <Container>
            <InputGroup size="lg" className="mx-auto w-50 mb-4">

                <Button variant='light' onClick={() => search()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>

                <FormControl
                    value={searchInput}
                    placeholder="What are you looking for?"
                    type="input"
                    onKeyPress={event => {
                        if (event.key == "Enter") {
                            search();
                        }
                    }}
                    onChange={event => {
                        setSearchInput(event.target.value);
                    }}
                />

                <Button variant='light' onClick={() => setSearchInput("")}>
                    <FontAwesomeIcon icon={faX} />
                </Button>

            </InputGroup>
            <ButtonGroup className="mx-auto mb-5" size="lg">
                <Button
                    id="button"
                    variant="outline-light">
                    All
                </Button>
                <Button
                    id="button"
                    variant="outline-light">
                    Artists
                </Button>
                <Button
                    id="button"
                    variant="outline-light">
                    Songs
                </Button>
            </ButtonGroup>

            <div id="search-cards">
                <Row className="row justify-content-center row-cols-5 gap-3">
                    {
                        artists.map((artist, i) => {
                            if (artist.images.length != 0 && searchInput != "") {
                                return (
                                    <Card key={i} className="text-light bg-dark my-4 p-2">
                                        <Card.Img
                                            id="card-image"
                                            className="rounded-circle shadow-med"
                                            src={artist.images[0].url}
                                            alt={"Picture of " + artist.name}
                                        />
                                        <Card.Body>
                                            <Card.Title
                                                className="">{artist.name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                </Row>
            </div>
        </Container>

    )
}

export default SearchBar;