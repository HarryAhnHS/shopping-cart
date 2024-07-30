import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="py-5 bg-red-800 text-white">
            <Link to="/" className="mx-1">Home</Link>
            <Link to="Shop" className="mx-1">Shop</Link>
        </div>
    )
}

export default Header;