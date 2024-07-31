import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "./components/Header";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);

    async function getProducts() {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const result = await response.json();

        const resultItems = result.filter((res) => res.id > 4 && res.id < 50).map((res) => {
            return ({
                title: res.title,
                price: res.price,
                images: res.images,
                id: res.id,
            })
        })
        setProducts(resultItems);
    }
    
    useEffect(() =>{
        getProducts();
    },[])

    console.log(products)
    return (
        <>
            <Header />
            <div className="flex flex-wrap">
                {products.map((prod) => {
                    return (
                        <div className="my-2 flex box-border rounded-lg border-2 w-1/3" key={prod.id}>
                            <div className="flex-none w-1/3 h-64">
                                <img src={prod.images[0]} className="inset-0 w-full h-full object-cover"></img>
                            </div>
                            <div className="flex-auto p-6">
                                <div className="flex flex-wrap">
                                    <h1 className="flex-auto text-lg font-semibold text-slate-9000">{prod.title}</h1>
                                    <div className="text-lg font-semibold text-slate-500">${prod.price}</div>
                                </div>
                                <div className="flex">
                                    <button className="w-8 h-8 border-2">+</button>
                                    <input className="w-6 h-8 text-center" type="num"></input>
                                    <button className="w-8 h-8 border-2">-</button>
                                </div>
                                <div>
                                    <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Shop;