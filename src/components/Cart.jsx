import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

const Cart = ({cart, setCart, toggleCart}) => {
    const calculateTotal = () => {
        return cart.reduce((accumulator, item) => accumulator += item.quantity * item.price, 0);
    };

    function increaseQuantity(prodId) {
        const updatedCart = [...cart]
        updatedCart.find((prod) => prod.id == prodId).quantity += 1;
    
        setCart(updatedCart);
    }
    
    function decreaseQuantity(prodId) {
        const updatedCart = [...cart]
        if (updatedCart.find((prod) => prod.id == prodId).quantity > 1) {
            updatedCart.find((prod) => prod.id == prodId).quantity -= 1;
        }

        setCart(updatedCart);
    }

    function deleteItem(e, prodId) {
        e.stopPropagation();
        const updatedCart = [...cart].filter((prod) => prod.id != prodId);
        
        setCart(updatedCart);
    }

    return (
        <>
            <div className="z-[2] fixed right-0 h-screen w-screen bg-white md:w-1/2 py-3 flex flex-col">
                <div className="flex items-center mx-5">
                    <h1 className="text-lg font-bold flex-1">
                        <FontAwesomeIcon icon={faBasketShopping} />
                        <span className="ml-2">Cart</span>
                    </h1>
                    <button className="text-[24px]"onClick={toggleCart}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                {(cart.length == 0)
                ?
                    <div className="flex-1 flex items-center justify-center">Cart is empty.</div>
                :
                    <div className="flex-1 overflow-y-scroll overscroll-none mx-3 mt-3 rounded-xl">
                        {cart.map((item) => {
                            return (
                                <div className="m-2 border border-gray-200 rounded-lg bg-white shadow-md" key={item.id}>
                                    <div className="flex items-center">
                                        <div className="flex-none w-1/4 h-32">
                                                <img src={item.images[0]} className="rounded-l-lg w-full h-full object-center object-cover"></img>
                                        </div>
                                        <div className="flex flex-col justify-around h-32 w-3/4 py-2">
                                            <div className="text-lg font-semibold tracking-tight mx-3 truncate overflow-hidden">{item.title}</div>
                                            
                                            <div className="flex">
                                                <div className="flex flex-1 items-center justify-center text-lg">
                                                    <button className="w-8 h-8 border" onClick={() => decreaseQuantity(item.id)}>-</button>
                                                    <div className="w-16 text-center">{item.quantity}</div>
                                                    <button className="w-8 h-8 border" onClick={() => increaseQuantity(item.id)}>+</button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-gray-500">
                                                <div className="mx-3 font-semibold">${item.price}</div>
                                                <button className="mx-3" onClick={(e) => deleteItem(e, item.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
                
                
                <div className="m-3 border-t-2 border-gray-200 mx-8 mt-3 flex flex-col">
                    <div className="font-base tracking-tight text-center my-3">Total: ${calculateTotal()}</div>
                    <button type="button" 
                            className="py-3 flex-1 text-white bg-[#283618] text-center hover:opacity-80">
                            Checkout
                    </button>
                </div>
            </div>
            <div className='overlay fixed h-screen w-screen bg-black bg-opacity-30' onClick={toggleCart}>
            </div>
        </>
    )
}

export default Cart;