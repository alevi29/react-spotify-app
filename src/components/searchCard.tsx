import { Card, Row } from 'react-bootstrap';

function SearchCard() {
    return (
        <Row className="mx-2 row row-cols-4">
            <Card className="text-light bg-dark mx-4">
                <Card.Img src="#"></Card.Img>
                <Card.Body>
                    <Card.Title>Album Names Here</Card.Title>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default SearchCard;