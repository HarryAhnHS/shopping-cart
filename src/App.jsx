import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useState } from 'react';

import Header from "./components/Header";
import Shop from './components/Shop';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleCart() {
      setIsCartOpen(!(isCartOpen));
  }

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

  return (
    <>
      <Router>
      {isCartOpen 
          ? 
            <Cart cart={cart} toggleCart={toggleCart}/>
          :
            null
      } 
      <Header cart={cart} toggleCart={toggleCart}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop 
          products={products}
          setProducts={setProducts}
          cart={cart} 
          setCart={setCart} 
          increaseSelected={increaseSelected} 
          decreaseSelected={decreaseSelected} 
          handleSelectedChange={handleSelectedChange}/>}
        />
      </Routes>
    </Router>
    </>
  )
}

export default App
