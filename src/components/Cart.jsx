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
            <div className="z-[2] fixed right-0 h-screen w-screen md:w-1/2 bg-white">
                <div className="flex items-center py-5 mx-5">
                    <h1 className="text-lg font-bold flex-1">Cart</h1>
                    <button onClick={toggleCart}>Close</button>
                </div>
                
                
                <div>
                    {cart.map((item) => {
                        return (
                            <div className="flex w-full h-32 bg-red-100" key={item.id}>
                                <div className="flex-none w-1/4 h-32">
                                        <img src={item.images[0]} className="w-full h-full object-center object-cover"></img>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-lg font-bold text–slate-900">{item.title}</div>
                                    <div className="flex">
                                        <button className="w-8 h-8 border-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                                        <div>{item.quantity}</div>
                                        <button className="w-8 h-8 border-2" onClick={() => increaseQuantity(item.id)}>+</button>
                                        <button onClick={(e) => deleteItem(e, item.id)}>Delete Item</button>
                                    </div>
                                    <div>${item.quantity * item.price}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div>Total: ${calculateTotal()}</div>
                    <button type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Checkout
                    </button>

                </div>
            </div>
            <div className='overlay fixed h-screen w-screen bg-black opacity-50' onClick={toggleCart}>
            </div>
        </>
    )
}

export default Cart;