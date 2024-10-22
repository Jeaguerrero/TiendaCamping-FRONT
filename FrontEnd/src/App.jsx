import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // Ya no necesitas importar BrowserRouter aquí
import ProductList from './components/ProductList'; 
//import FormLogin from './components/FormLogin'; 
import Cart from './components/Cart'; 
import { CartManager } from './components/CartManager'; 
import Navbar from './components/NavBar'; 
import './App.css'; 

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartManager>
      {/* El Router ya está en main.jsx, aquí solo definimos las rutas */}
      <Navbar toggleCart={toggleCart} />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/productos" element={<ProductList />} />

      </Routes>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </CartManager>
  );
}

export default App;
