import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useState } from 'react';

import Header from "./components/Header";
import Shop from './components/Shop';
import Home from './components/Home';

function App() {
  const [cart, setCart] = useState([]);


  return (
    <>
      <Router>
      <Header cart={cart}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop cart={cart} setCart={setCart}/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
