import { useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const ProductPage = ({products, decreaseSelected, handleSelectedChange, increaseSelected, addToCart, loading}) => {
    const { id } = useParams()
    const spotlight = products.find((prod) => prod.id == id);
    
    return (
        loading
        ? 
            <LoadingPage />
        :
            <section className="flex flex-col mx-12 sm:mx-24 my-6 md:flex-row">
                <div className="flex-none w-full flex justify-center items-center md:w-1/2">
                    <img src={spotlight.images[0]} className="inset-0 w-full h-full object-cover"></img>
                </div>
                <div className="flex flex-col flex-auto p-6 justify-around">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-3xl font-semibold text-black]">{spotlight.title}</h1>
                        <div className="text-2xl font-semibold text-gray-500">${spotlight.price}</div>
                    </div>
                    <p className="my-8 text-md font-normal text-gray-500 lg:text-lg dark:text-gray-400">Crafted from premium, breathable cotton with a touch of stretch, this hoodie is designed for the modern trendsetter. Featuring a relaxed fit, minimalist design, and subtle detailing, it is perfect for layering or wearing solo. Whether you are lounging at home or stepping out, this hoodie effortlessly elevates your casual look while keeping you warm and comfortable. Available in a range of versatile colors to match your every mood.</p>
                    <div>
                        <div className="flex justify-center">
                            <button className="w-8 h-8 border" onClick={(e) => decreaseSelected(e, spotlight.id)}>-</button>
                            <input 
                                className="w-16 h-8 text-center" 
                                aria-label="product page selected input"
                                type="number" 
                                min="0" 
                                value={spotlight.selected} 
                                onClick={(e) => e.stopPropagation()} // Stops event propagation
                                onChange={(e) => handleSelectedChange(e, spotlight.id)} 
                            />
                            <button className="w-8 h-8 border" onClick={(e) => increaseSelected(e, spotlight.id)}>+</button>
                        </div>
                        <div className="flex justify-center m-6">
                            <button className="h-10 w-full text-[0.9rem] font-semibold text-[#FFFFFF] bg-[#283618] active:scale-95 transition-all duration-100" type="submit" onClick={(e) => addToCart(e, spotlight.id)}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default ProductPage;