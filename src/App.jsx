import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useState } from 'react';

import Header from "./components/Header";
import Shop from './components/Shop';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleCart() {
      setIsCartOpen(!(isCartOpen));
  }

  function increaseSelected(e, prodId) {
    e.stopPropagation();
    const updatedProducts = [...products]
    updatedProducts.find((prod) => prod.id == prodId).selected += 1;

    setProducts(updatedProducts);
  }

  function decreaseSelected(e, prodId) {
      e.stopPropagation();
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

      let updatedCart = [...cart];
      if (exists) updatedCart.find((prod) => prod.id == prodId).quantity += newProducts.quantity;
      else updatedCart = [...updatedCart, newProducts];

      setCart(updatedCart);
      resetSelected(prodId);
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
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop 
          products={products}
          setProducts={setProducts}
          cart={cart} 
          decreaseSelected={decreaseSelected} 
          handleSelectedChange={handleSelectedChange} 
          increaseSelected={increaseSelected}
          addToCart={addToCart}
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
    </Router>
    </>
  )
}

export default App
