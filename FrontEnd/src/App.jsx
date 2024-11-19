import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
//import ProductList from './components/ProductList'; 
import { AppProvider } from "./components/AppContext"; 
import FormLogin from './components/FormLogin'; 
import Cart from './components/Cart'; 
import Navbar from './components/NavBar'; 
import AddProducts from './components/productos/AddProduct'
import Register from './components/Register'
import { CartManager } from './components/CartManager'; 
import './App.css'; 
import ProductList from './components/MarketPage';
import UserOrders from "./components/UserOrders"; 
import Home from './components/Home';
import Ventas from "./components/Ventas";



function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <AppProvider>
    <CartManager>
      {/* El Router ya está en main.jsx, aquí solo definimos las rutas */}
      <Navbar toggleCart={toggleCart} />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/agregar" element={<AddProducts />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<Register />} />
         <Route path="/mis-compras" element={<UserOrders />} />
         <Route path="/ventas" element={<Ventas />} />


      </Routes>
      <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
    </CartManager>
    </AppProvider>
  );
}

export default App;
