import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
    const [products, setProducts] = useState([]);
    async function getProducts() {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const result = await response.json();

        const resultItems = result.filter((res) => res.id < 50).map((res) => {
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
            <div>Shop</div>
            <Link to="/">Home</Link>
            <div className="flex flex-wrap">
                {products.map((prod) => {
                    return (
                    <div className="w-1/3" key={prod.id}>
                        <h1>{prod.title}</h1>
                        <div>
                            {prod.images.map((link, idx) => {
                                return (<div key={idx}>
                                    <img src={link}></img>
                                </div>)
                            })}
                        </div>
                        <div>${prod.price}</div>
                    </div>
                    )
                })}
            </div>
        </>
    )
}

export default Shop;