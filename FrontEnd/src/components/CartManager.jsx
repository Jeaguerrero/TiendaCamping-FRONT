import React, { useState, createContext } from 'react';

export const CartContext = createContext();

export const CartManager = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Carpa', price: 100, stock: 5 },
    { id: 2, name: 'Bolsa de dormir', price: 50, stock: 10 },
    { id: 3, name: 'Linterna', price: 30, stock: 15 },
  ]);

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
    setProducts(updatedProducts);
  };

  // Nueva función para vaciar el carrito
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
    <CartContext.Provider value={{ cartItems, products, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
