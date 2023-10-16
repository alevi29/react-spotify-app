import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");

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
                            alert("Enter Pressed!")
                        }
                    }}
                    onChange={event => setSearchInput(event.target.value)}
                />
            </InputGroup>
        </Container>

    )
}

export default SearchBar;