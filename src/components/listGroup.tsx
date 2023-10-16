import { Fragment } from "react";

function ListGroup() {
    const items = [
        "One",
        "Two",
        "Three",
        "Four"
    ]

    const randInt = Math.random()

    const itemsList = items.map((item, i) => <li key={i}>{item}</li>);

    return (
        <Fragment>
            <ul className="list-group">
                {randInt > 0.5 ? itemsList : <p>Not enough memory to load list!</p>}
            </ul>
        </Fragment>
    );
}

export default ListGroup;
