import { useParams } from "react-router-dom";

const ProductPage = ({products, decreaseSelected, handleSelectedChange, increaseSelected, addToCart}) => {
    const { id } = useParams()
    const spotlight = products.find((prod) => prod.id == id);
    
    return (
        <>
                <div className="flex-none w-1/3 h-64">
                    <img src={spotlight.images[0]} className="inset-0 w-full h-full object-cover"></img>
                </div>
                <div className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-9000">{spotlight.title}</h1>
                        <div className="text-lg font-semibold text-slate-500">${spotlight.price}</div>
                    </div>
                    <div className="flex">
                        <button className="w-8 h-8 border-2" onClick={(e) => decreaseSelected(e, id)}>-</button>
                        <input className="w-16 h-8 text-center" type="text" min="0" value={spotlight.selected} onChange={(e) => handleSelectedChange(e, id)}></input>
                        <button className="w-8 h-8 border-2" onClick={(e) => increaseSelected(e, id)}>+</button>
                    </div>
                    <div>
                        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit" onClick={(e) => addToCart(e, id)}>
                            Add to cart
                        </button>
                    </div>
                </div>
        </>
    )
}

export default ProductPage;