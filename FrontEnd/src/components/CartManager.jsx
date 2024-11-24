import React, { useState, createContext, useEffect } from 'react';
 
export const CartContext = createContext();
 
export const CartManager = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:4002/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
 
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
 
        const data = await response.json();
        setProducts(data.content);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProducts();
  }, []);
 
  const addToCart = (product, quantity) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    const productInStock = products.find(item => item.id === product.id);
 
    if (quantity > productInStock.stock) {
      alert(`No hay suficiente stock para ${product.name}. Stock disponible: ${productInStock.stock}`);
      return;
    }
 
    if (existingProduct) {
      const totalQuantityInCart = existingProduct.quantity + quantity;
 
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: totalQuantityInCart } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
 
    const updatedProducts = products.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - quantity } : p
    );
    setProducts(updatedProducts); // Actualizamos los productos y el stock
  };
 
  const clearCart = () => {
    setCartItems([]);
  };
 
  const removeFromCart = (id) => {
    const removedProduct = cartItems.find(item => item.id === id);
 
    if (removedProduct) {
      const updatedProducts = products.map(p =>
        p.id === removedProduct.id ? { ...p, stock: p.stock + removedProduct.quantity } : p
      );
      setProducts(updatedProducts);
 
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };
 
  return (
    <CartContext.Provider value={{ cartItems, products, addToCart, removeFromCart, clearCart, loading, error }}>

      {children}
    </CartContext.Provider>
  );
};