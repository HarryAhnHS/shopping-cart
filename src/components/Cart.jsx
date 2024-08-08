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

    
    console.log(cart)
    return (
        <>
            <div className="z-[2] fixed right-0 h-screen w-screen md:w-1/2 bg-[#edede9] py-5 px-1 flex flex-col">
                <div className="flex items-center mx-5">
                    <h1 className="text-lg font-bold flex-1">Cart</h1>
                    <button onClick={toggleCart}>Close</button>
                </div>
                
                <div className="flex-1">
                    {cart.map((item) => {
                        return (
                            <div className="w-full h-32" key={item.id}>
                                <div className="mx-2 flex bg-white rounded-xl">
                                    <div className="flex-none w-1/4 h-32">
                                            <img src={item.images[0]} className="w-full h-full object-center object-cover rounded-l-xl"></img>
                                    </div>
                                    <div className="flex flex-col flex-1 p-3">
                                        <div className="text-lg font-bold text–slate-900">{item.title}</div>
                                        
                                        <div className="flex flex-1">
                                            <div className="flex flex-1 items-center justify-center">
                                                <button className="w-8 h-8 border-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                                                <div className="w-8 text-center">{item.quantity}</div>
                                                <button className="w-8 h-8 border-2" onClick={() => increaseQuantity(item.id)}>+</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="mx-3">${item.quantity * item.price}</div>
                                            <button className="mx-3" onClick={(e) => deleteItem(e, item.id)}>Delete Item</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Checkout
                </button>
                <div className="text-lg font-bold text-start ml-3">Total: ${calculateTotal()}</div>

            </div>
            <div className='overlay fixed h-screen w-screen bg-black opacity-50' onClick={toggleCart}>
            </div>
        </>
    )
}

export default Cart;