import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

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
                                    <div className="box-border w-full sm:w-1/2 lg:w-1/3 p-3" key={prod.id}>
                                        <div className="flex rounded-lg cursor-pointer bg-[#FFFFFF] shadow-xl" onClick={() => routeChange(prod.id)}>
                                            <div className="flex-none w-1/3 h-64">
                                                <img src={prod.images[0]} className="inset-0 w-full h-full object-cover rounded-l-lg"></img>
                                            </div>
                                            <div className="flex-auto p-6 flex flex-col">
                                                <div className="flex flex-col">
                                                    <h1 className="flex-auto text-lg font-semibold text-slate-9000">{prod.title}</h1>
                                                    <div className="text-lg font-semibold text-slate-500">${prod.price}</div>
                                                </div>
                                                <div className="flex flex-1 items-center justify-center mb-5">
                                                    <button className="w-8 h-8 border-2" onClick={(e) => decreaseSelected(e, prod.id)}>-</button>
                                                    <input className="w-16 h-8 text-center bg-[#edede9]" type="text" min="0" value={prod.selected} onClick={(e) => e.stopPropagation()} onChange={(e) => handleSelectedChange(e, prod.id)}></input>
                                                    <button className="w-8 h-8 border-2" onClick={(e) => increaseSelected(e, prod.id)}>+</button>
                                                </div>
                                                <button className="h-10 font-semibold rounded-md bg-black text-white active:" type="submit" onClick={(e) => addToCart(e, prod.id)}>
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