import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import QuantityInput from "./QuantityInput";

const Shop = ({products, isCalled, decreaseSelected, handleSelectedChange, increaseSelected, addToCart, loading}) => {

    let navigate = useNavigate(); 
    const routeChange = (id) => { 
        let path = `/shop/${id}`; 
        navigate(path);
    }
    
    console.log(isCalled)

    return (
        <>
            {loading
            ? 
                <LoadingPage />
            :
                isCalled 
                ?
                    <div className="flex flex-wrap p-6">
                        {products.map((prod) => {
                            return (
                                    <div className="box-border w-full md:w-1/2 p-3" key={prod.id}>
                                        <div className="flex rounded-lg cursor-pointer bg-[#FFFFFF] shadow-xl" onClick={() => routeChange(prod.id)}>
                                            <div className="flex-none w-1/3 h-64">
                                                <img src={prod.images[0]} className="inset-0 w-full h-full object-cover rounded-l-lg"></img>
                                            </div>
                                            <div className="flex-auto p-6 flex flex-col">
                                                <div className="flex flex-col">
                                                    <h1 className="flex-auto text-base md:text-lg font-semibold text-black">{prod.title}</h1>
                                                    <div className="text-base md:text-lg font-semibold text-gray-500">${prod.price}</div>
                                                </div>
                                                <div className="flex flex-1 items-center justify-center mb-5">
                                                    <QuantityInput decreaseSelected={decreaseSelected} handleSelectedChange={handleSelectedChange} increaseSelected={increaseSelected} product={prod}/>
                                                </div>
                                                <button className="h-10 text-[0.9rem] font-semibold text-[#FFFFFF] bg-[#283618] active:scale-95 transition-all duration-100" type="submit" onClick={(e) => addToCart(e, prod.id)}>
                                                        Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            )
                        })}
                    </div>
                :
                    <div className="flex p-60 font-bold text-lg items-center justify-center">No stock. Please try again another time</div>
            }
        </>
    )
}

export default Shop;