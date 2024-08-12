const QuantityInput = ({decreaseSelected, handleSelectedChange, increaseSelected, product}) => {
    return (
        <>
            <button className="w-8 h-8 border-2" onClick={(e) => decreaseSelected(e, product.id)}>-</button>
            <input className="w-16 h-8 text-center" type="text" min="0" value={product.selected} onChange={(e) => handleSelectedChange(e, product.id)}></input>
            <button className="w-8 h-8 border-2" onClick={(e) => increaseSelected(e, product.id)}>+</button>
        </>
    )
};

export default QuantityInput;