import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1>This page does not exist</h1>
            <Link to="/">Click here to return to home</Link>
        </div>
    )
}

export default ErrorPage;