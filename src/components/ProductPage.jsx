import { useParams } from "react-router-dom";

const ProductPage = ({products, decreaseSelected, handleSelectedChange, increaseSelected, addToCart}) => {
    const { id } = useParams()
    const spotlight = products.find((prod) => prod.id == id);
    
    return (
        <section className="flex flex-col border-4 border-gray-500 mx-24 my-6 sm:flex-row">
            <div className="flex-none w-full flex justify-center items-center sm:w-1/3 lg:w-1/2">
                <img src={spotlight.images[0]} className="inset-0 w-full h-full object-cover"></img>
            </div>
            <div className="flex flex-col flex-auto p-6 justify-around">
                <div className="flex flex-wrap">
                    <h1 className="flex-auto text-3xl font-semibold text-slate-9000">{spotlight.title}</h1>
                    <div className="text-2xl font-semibold text-slate-500">${spotlight.price}</div>
                </div>
                <p className="my-8 text-md font-normal text-gray-500 lg:text-lg dark:text-gray-400">Crafted from premium, breathable cotton with a touch of stretch, this hoodie is designed for the modern trendsetter. Featuring a relaxed fit, minimalist design, and subtle detailing, it's perfect for layering or wearing solo. Whether you're lounging at home or stepping out, this hoodie effortlessly elevates your casual look while keeping you warm and comfortable. Available in a range of versatile colors to match your every mood.</p>
                <div>
                    <div className="flex justify-center">
                        <button className="w-8 h-8 border-2" onClick={(e) => decreaseSelected(e, id)}>-</button>
                        <input className="w-16 h-8 text-center" type="text" min="0" value={spotlight.selected} onChange={(e) => handleSelectedChange(e, id)}></input>
                        <button className="w-8 h-8 border-2" onClick={(e) => increaseSelected(e, id)}>+</button>
                    </div>
                    <div className="flex justify-center m-3">
                        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit" onClick={(e) => addToCart(e, id)}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductPage;