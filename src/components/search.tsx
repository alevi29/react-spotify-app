import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
    const [tracks, setTracks] = useState<any[]>([]);
    const [searchType, setSearchType] = useState(true);

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

        // fetch and set access token
        fetch('https://accounts.spotify.com/api/token', param)
            .then(result => result.json())
            .then(data => {
                setAccessToken(data.access_token);
            })
    }, []);

    useEffect(() => {
        // run search whenever search type or input changes
        search();
    }, [searchInput, searchType])

    async function search() {
        if (searchInput == "") return;
        console.log("Searching for " + searchInput);

        // GET request: get artist ID
        var artistParam = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        // retrieve list of artists and tracks
        await fetch('https://api.spotify.com/v1/search?q=' + searchInput
            + '&type=artist,track' + '&limit=20', artistParam)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setArtists(data.artists.items);
                setTracks(data.tracks.items);
            });
    }

    return (
        <Container>
            {/* search bar */}
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
                    <FontAwesomeIcon icon={faXmark} />
                </Button>

            </InputGroup>

            {/* buttons to filter search results */}
            <ButtonGroup className="mx-auto mb-5" size="lg">
                <Button
                    onClick={() => {
                        setSearchType(true);
                    }}
                    id="button"
                    variant={searchType == true ? "light" : "outline-light"}>
                    Artists
                </Button>
                <Button
                    onClick={() => {
                        setSearchType(false);
                    }}
                    id="button"
                    variant={searchType == false ? "light" : "outline-light"}>
                    Tracks
                </Button>
            </ButtonGroup>

            {/* cards displayed according to search filters */}
            <div id="search-cards">
                <Row className="row justify-content-center row-cols-5 gap-3">
                    {
                        searchType ?
                            artists.map((result, i) => {
                                if (searchType && searchInput != "" && result.images.length != 0) {
                                    return (
                                        <Card className="text-light bg-dark my-4 p-2">
                                            <a key={i} href={result.external_urls.spotify}>
                                                <Card.Img
                                                    id="card-image"
                                                    className="rounded-circle shadow-med"
                                                    src={result.images[0].url}
                                                    alt={"Picture of " + result.name}
                                                />
                                            </a>
                                            <Card.Body>
                                                <Card.Title
                                                    className="">{result.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    );
                                }
                            }) :
                            tracks.map((result, i) => {
                                if (!searchType && searchInput != "" && result.album.images.length != 0) {
                                    return (
                                        <Card className="text-light bg-dark my-4 p-2">
                                            <a key={i} href={result.external_urls.spotify}>
                                                <Card.Img
                                                    id="card-image"
                                                    className="rounded-circle shadow-med"
                                                    src={result.album.images[0].url}
                                                    alt={"Album art for " + result.album.name}
                                                />
                                            </a>
                                            <Card.Body>
                                                <Card.Title
                                                    className="">{result.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    );
                                }

                            })
                    }
                </Row>
            </div>
        </Container>

    )
}

export default SearchBar;