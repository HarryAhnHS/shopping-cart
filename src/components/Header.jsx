import { Link } from "react-router-dom";
import Wavelength from '/wavelength.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

const Header = ({cart, toggleCart}) => {

    function consolidateCart() {
        return cart.reduce((accumulator, item) => accumulator + item.quantity,0,);
    }

    return (
        <div className="p-6 text-[#283618]">
            <div className="relative tracking-tight text-lg">
                <Link to="/" className="absolute left-0 mx-3 cursor-pointer">
                    <div className="w-[160px] md:w-[200px]">
                        <img src={Wavelength} className="w-full"></img>
                    </div>
                </Link>
                
                <div className="absolute right-0 flex items-center px-6 gap-6 md:gap-12">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>    
                    <button className="relative ml-3 md:ml-6 text-[20px]"onClick={() => toggleCart()}>
                        <FontAwesomeIcon icon={faBasketShopping} />
                        <span className=" absolute bottom-3 left-6 bg-red-700 text-white text-[12px] w-[18px] h-[18px] rounded-full flex items-center justify-center">{consolidateCart()}</span>
                    </button>
                </div> 
            </div>
        </div>

    )
}

export default Header;