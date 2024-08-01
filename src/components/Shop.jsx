import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Shop = ({products, setProducts, cart, decreaseSelected, handleSelectedChange, increaseSelected, addToCart}) => {
    const [loading, setLoading] = useState(true);

    let navigate = useNavigate(); 
    const routeChange = (id) => { 
        let path = `/shop/${id}`; 
        navigate(path);
    }
    
    async function getProducts() {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const result = await response.json();
            const resultItems = result.filter((res) => res.id > 0 && res.id < 50).map((res) => {
                return ({
                    title: res.title,
                    price: res.price,
                    images: res.images,
                    id: res.id,
                    selected: 1,
                    favorite: false,
                })
            })
            setProducts(resultItems);
        }
        catch(err) {
            throw new Error(err);
        }
        finally {
            setLoading(false);
        }
    }
  
    useEffect(() =>{
      getProducts();
  }, [])
    


    console.log(products);
    console.log(cart);
    return (
        <>
            {loading
            ? 
                <div className="h-screen w-full flex items-center justify-center">Loading...</div>
            :
                <div className="flex flex-wrap">
                    {products.map((prod) => {
                        return (
                                <div className="box-border w-full sm:w-1/2 lg:w-1/3 p-3" key={prod.id}>
                                    <div className="flex rounded-lg border-2 cursor-pointer" onClick={() => routeChange(prod.id)}>
                                        <div className="flex-none w-1/3 h-64">
                                            <img src={prod.images[0]} className="inset-0 w-full h-full object-cover"></img>
                                        </div>
                                        <div className="flex-auto p-6">
                                            <div className="flex flex-wrap">
                                                <h1 className="flex-auto text-lg font-semibold text-slate-9000">{prod.title}</h1>
                                                <div className="text-lg font-semibold text-slate-500">${prod.price}</div>
                                            </div>
                                            <div className="flex">
                                                <button className="w-8 h-8 border-2" onClick={(e) => decreaseSelected(e, prod.id)}>-</button>
                                                <input className="w-16 h-8 text-center" type="text" min="0" value={prod.selected} onChange={(e) => handleSelectedChange(e, prod.id)}></input>
                                                <button className="w-8 h-8 border-2" onClick={(e) => increaseSelected(e, prod.id)}>+</button>
                                            </div>
                                            <div>
                                                <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit" onClick={(e) => addToCart(e, prod.id)}>
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Shop;