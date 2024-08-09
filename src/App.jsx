import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useState, useEffect } from 'react';

import Header from "./components/Header";
import Shop from './components/Shop';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import LoadingPage from './components/LoadingPage';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
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

  function increaseSelected(e, prodId) {
    e.stopPropagation();
    const updatedProducts = [...products]
    updatedProducts.find((prod) => prod.id == prodId).selected += 1;

    setProducts(updatedProducts);
  }

  function decreaseSelected(e, prodId) {
      e.stopPropagation();
      const updatedProducts = [...products]
      if (updatedProducts.find((prod) => prod.id == prodId).selected > 1) {
        updatedProducts.find((prod) => prod.id == prodId).selected -= 1;
      }

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

  function addToCart(e, prodId) {
      e.stopPropagation();
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

      if (newProducts.quantity < 1) {
        resetSelected(prodId);
        return;
      }
 
      let updatedCart = [...cart];
      if (exists) updatedCart.find((prod) => prod.id == prodId).quantity += newProducts.quantity;
      else updatedCart = [...updatedCart, newProducts];

      setCart(updatedCart);
      resetSelected(prodId);
  }

  function toggleCart() {
    setIsCartOpen(!(isCartOpen));
  }

  return (
    <>
      <Router>
        {isCartOpen 
            ? 
              <Cart cart={cart} setCart={setCart} toggleCart={toggleCart}/>
            :
              null
        } 
        <Header 
          cart={cart} 
          toggleCart={toggleCart}
        />
        <Routes>
          <Route 
            path='/'
            element={loading 
              ? <LoadingPage />
              : <Home featured={products.slice(0,3)} />}
            />
          <Route path='/shop' 
            element={<Shop 
              products={products}
              decreaseSelected={decreaseSelected} 
              handleSelectedChange={handleSelectedChange} 
              increaseSelected={increaseSelected}
              addToCart={addToCart}
              loading={loading}
            />}
          />
          <Route
              path="/shop/:id"
              element={
                <ProductPage 
                  products={products} 
                  decreaseSelected={decreaseSelected} 
                  handleSelectedChange={handleSelectedChange} 
                  increaseSelected={increaseSelected}
                  addToCart={addToCart}/>
              }
            />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
