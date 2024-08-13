import { Link } from "react-router-dom";
import Wavelength from '/wavelength.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

const Header = ({cart, toggleCart}) => {

    function consolidateCart() {
        return cart.reduce((accumulator, item) => accumulator + item.quantity,0,);
    }

    return (
        <div className="px-6 pt-6 text-[#283618]">
            <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between tracking-tight text-lg">
                <Link to="/" className="cursor-pointer">
                    <div className="w-[200px] sm:w-[240px]">
                        <img src={Wavelength} alt="logo" className="w-full"></img>
                    </div>
                </Link>
                
                <div className="text-xl sm:text-lg sm:mr-24 flex items-center px-6 gap-16 sm:gap-12">
                    <Link className="hover:underline hover:underline-offset-4" to="/">Home</Link>
                    <Link className="hover:underline hover:underline-offset-4" to="/shop">Shop</Link>    
                </div> 

                <button className="absolute right-3 sm:right-6 sm:ml-12 text-[20px]" aria-label="cart button" onClick={() => toggleCart()}>
                        <FontAwesomeIcon icon={faBasketShopping} />
                        <span 
                            className="absolute bottom-3 left-6 bg-red-700 text-white text-[12px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
                            aria-label="cart count"
                        >
                            {consolidateCart()}
                        </span>
                </button>
            </div>
        </div>

    )
}

export default Header;