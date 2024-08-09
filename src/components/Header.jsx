import { Link } from "react-router-dom";
import Wavelength from '../../public/wavelength.png'

const Header = ({cart, toggleCart}) => {

    function consolidateCart() {
        return cart.reduce((accumulator, item) => accumulator + item.quantity,0,);
    }

    return (
        <div className="p-6 text-[#283618]">
            <div className="relative flex justify-center items-center font-bold tracking-tight">
                <Link to="/" className="absolute left-0 mx-3 cursor-pointer">
                    <div className="w-[120px] md:w-[200px]">
                        <img src={Wavelength} className="w-full"></img>
                    </div>
                </Link>
                
                <div className="flex items-center">
                    <Link to="/" className="mr-6 md:mr-12 lg:mr-24">Home</Link>
                    <Link to="/shop">Shop</Link>    
                </div> 

                <button className="absolute right-0 mx-3" onClick={() => toggleCart()}>Cart ({consolidateCart()})</button>
            </div>
        </div>

    )
}

export default Header;