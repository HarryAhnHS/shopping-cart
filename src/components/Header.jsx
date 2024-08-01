import { Link } from "react-router-dom";

const Header = ({cart, toggleCart}) => {

    function consolidateCart() {
        return cart.reduce((accumulator, item) => accumulator + item.quantity,
        0,);
    }

    return (
        <div>
            <div className="flex py-5 bg-red-800 text-white">
                <Link to="/" className="mx-1">Home</Link>
                <Link to="/Shop" className="mx-1">Shop</Link>
                <button className="mx-1" onClick={() => toggleCart()}>Cart ({consolidateCart()})</button>
            </div>
        </div>

    )
}

export default Header;