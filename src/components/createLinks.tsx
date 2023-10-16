import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import '/src/App.css';

function CreateLinks() {
    return (
        <ul id="links">
            <li className="link">
                <a href="https://github.com/alevi29">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </li>
            <li className="link">
                <a href="https://www.linkedin.com/in/alexcai277/">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </li>
        </ul>
    )
}

export default CreateLinks;