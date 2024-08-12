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
            <div className="z-[2] fixed right-0 h-screen w-screen bg-white md:w-1/2 py-3 flex flex-col">
                <div className="flex items-center m-5">
                    <h1 className="text-lg font-bold flex-1">Cart</h1>
                    <button onClick={toggleCart}>Close</button>
                </div>
                
                <div className="flex-1 overflow-y-scroll overscroll-none mb-3">
                    {cart.map((item) => {
                        return (
                            <div className="mb-3 mx-3" key={item.id}>
                                <div className="flex bg-white items-center">
                                    <div className="flex-none w-1/4 h-32">
                                            <img src={item.images[0]} className="w-full h-full object-center object-cover"></img>
                                    </div>
                                    <div className="flex flex-col flex-1 h-32">
                                        <div className="text-lg tracking-tight m-3 flex-1">{item.title}</div>
                                        
                                        <div className="flex">
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

                <div className="flex flex-col">
                    <button type="button" 
                            className="text-white bg-black hover:opacity-80 focus:outline-none focus:ring-4 font-medium text-sm py-2.5 mx-12 text-center">
                            Checkout
                    </button>
                    <div className="text-lg font-bold tracking-tight text-center">Total: ${calculateTotal()}</div>
                </div>
            </div>
            <div className='overlay fixed h-screen w-screen bg-black opacity-50' onClick={toggleCart}>
            </div>
        </>
    )
}

export default Cart;