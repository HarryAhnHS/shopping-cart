const Cart = ({cart, toggleCart}) => {
    const calculateTotal = () => {
        return cart.reduce((accumulator, item) => accumulator += item.quantity * item.price, 0);
    };
    console.log(cart)
    return (
        <>
            <div className="z-[2] fixed right-0 h-screen w-1/2 bg-white">
                <div className="flex items-center">
                    <h1 className="text-lg font-bold flex-1">Cart</h1>
                    <button onClick={toggleCart}>Close</button>
                </div>
                
                
                <div>
                    {cart.map((item) => {
                        return <div className="flex w-full h-32 bg-red-100" key={item.id}>
                            <div className="flex-none w-1/4 h-32">
                                    <img src={item.images[0]} className="w-full h-full object-center object-cover"></img>
                            </div>
                            <div className="text-lg">{item.title}</div>
                            <div>{item.quantity}</div>
                            <div>${item.quantity * item.price}</div>
                        </div>
                    })}
                    <p>Total: ${calculateTotal()}</p>
                </div>
            </div>
            <div className='overlay fixed h-screen w-screen bg-black opacity-50' onClick={toggleCart}>
            </div>
        </>
    )
}

export default Cart;