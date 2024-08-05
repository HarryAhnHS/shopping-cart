import { Link } from "react-router-dom";

const Header = ({cart, toggleCart}) => {

    function consolidateCart() {
        return cart.reduce((accumulator, item) => accumulator + item.quantity,0,);
    }

    return (
        <div>
            <div className="flex py-5 bg-[#403d39] text-white">
                <div className="flex-1">
                    <Link to="/" className="mx-8">Home</Link>
                    <Link to="/shop" className="mx-8">Shop</Link>    
                </div> 
                <button className="mx-8" onClick={() => toggleCart()}>Cart ({consolidateCart()})</button>
            </div>
        </div>

    )
}

export default Header;