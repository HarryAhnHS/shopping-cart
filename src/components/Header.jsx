import { useState } from "react";
import { Link } from "react-router-dom";

import Cart from './Cart';

const Header = ({cart}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    function consolidateCart() {
        return cart.reduce((accumulator, item) => accumulator + item.quantity,
        0,);
    }

    function toggleCart() {
        setIsCartOpen(!(isCartOpen));
    }

    console.log(isCartOpen);

    return (
        <div>
            {isCartOpen 
            ? 
                <Cart cart={cart} toggleCart={toggleCart}/>
            :
                null
            }
            <div className="flex py-5 bg-red-800 text-white">
                <Link to="/" className="mx-1">Home</Link>
                <Link to="/Shop" className="mx-1">Shop</Link>
                <button className="mx-1" onClick={() => toggleCart()}>Cart ({consolidateCart()})</button>
            </div>
        </div>

    )
}

export default Header;