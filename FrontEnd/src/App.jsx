import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import EditProduct from './components/edit_Products/ProductEditList';
import FormLogin from './components/FormLogin'; 
import Cart from './components/Cart'; 
import Navbar from './components/NavBar'; 
import AddProducts from './components/productos/AddProduct'
import Register from './components/Register'
import { CartManager } from './components/CartManager'; 
import './App.css'; 
import ProductList from './components/MarketPage';

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
        <Route path="/agregar" element={<AddProducts />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editProduct" element={<EditProduct />} />
      </Routes>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </CartManager>
  );
}

export default App;
