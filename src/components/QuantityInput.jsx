const QuantityInput = ({decreaseSelected, handleSelectedChange, increaseSelected, product}) => {

    return (
        <>
            <button className="w-8 h-8 border" onClick={(e) => decreaseSelected(e, product.id)}>-</button>
            <input 
                className="w-16 h-8 text-center" 
                type="number" 
                min="0" 
                value={product.selected} 
                onClick={(e) => e.stopPropagation()} // Stops event propagation
                onChange={(e) => handleSelectedChange(e, product.id)} 
            />
            <button className="w-8 h-8 border" onClick={(e) => increaseSelected(e, product.id)}>+</button>
        </>
    )
};

export default QuantityInput;