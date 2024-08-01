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
          setCart={setCart}
          />}
        />
      </Routes>
    </Router>
    </>
  )
}

export default App
