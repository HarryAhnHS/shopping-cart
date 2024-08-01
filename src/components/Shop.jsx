import { useEffect, useState } from "react";

const Shop = ({products, setProducts, cart, setCart}) => {
    const [loading, setLoading] = useState(true);
    // const [favorites, setFavorites] = useState([]);

    async function getProducts() {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const result = await response.json();
            const resultItems = result.filter((res) => res.id > 4 && res.id < 50).map((res) => {
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

    function increaseSelected(prodId) {
        const updatedProducts = [...products]
        updatedProducts.find((prod) => prod.id == prodId).selected += 1;
    
        setProducts(updatedProducts);
    }
    
    function decreaseSelected(prodId) {
        const updatedProducts = [...products]
        updatedProducts.find((prod) => prod.id == prodId).selected -= 1;
    
        setProducts(updatedProducts);
    }
    
    function handleSelectedChange(e, prodId) {
        const updatedProducts = [...products]
        updatedProducts.find((prod) => prod.id == prodId).selected = e.target.value;
    
        setProducts(updatedProducts);
    }
    
    function resetSelected(prodId) {
        const updatedProducts = [...products]
        updatedProducts.find((prod) => prod.id == prodId).selected = 1;

        setProducts(updatedProducts);
    }

    function toggleFavorite(prodId) {
        const updatedProducts = [...products];
        updatedProducts.find(((prod) => prod.id == prodId)).favorite = !(updatedProducts.find(((prod) => prod.id == prodId)).favorite);

        setProducts(updatedProducts);
    }


    function addToCart(prodId) {
        let exists = false;
        cart.forEach((prod) => {
            if (prod.id == prodId) exists = true;
        })

        const newProducts = {
            id: prodId,
            title: products.find((prod) => prod.id == prodId).title,
            price: products.find((prod) => prod.id == prodId).price,
            images: products.find((prod) => prod.id == prodId).images,
            quantity: products.find((prod) => prod.id == prodId).selected,
            favorite: products.find((prod) => prod.id == prodId).favorite
        }

        let updatedCart = [...cart];
        if (exists) updatedCart.find((prod) => prod.id == prodId).quantity += newProducts.quantity;
        else updatedCart = [...updatedCart, newProducts];

        setCart(updatedCart);
        resetSelected(prodId);
    }


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
                                        <button className="w-8 h-8 border-2" onClick={() => decreaseSelected(prod.id)}>-</button>
                                        <input className="w-16 h-8 text-center" type="text" min="0" value={prod.selected} onChange={(e) => handleSelectedChange(e, prod.id)}></input>
                                        <button className="w-8 h-8 border-2" onClick={() => increaseSelected(prod.id)}>+</button>
                                    </div>
                                    <div>
                                        <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit" onClick={() => addToCart(prod.id)}>
                                            Add to cart
                                        </button>
                                        <button className="h-10 px-6 font-normal rounded-md bg-black text-white" onClick={() => toggleFavorite(prod.id)}>{prod.favorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
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