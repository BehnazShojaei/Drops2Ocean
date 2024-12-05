// to my react router add the file path, import NotFoundPage

import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="back-home-link">Go to HomePage</Link>
        </div>
    );
}

export default NotFoundPage;
