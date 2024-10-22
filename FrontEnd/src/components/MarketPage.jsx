// src/components/MarketPage.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from './CartManager';
import './MarketPage.css'; // Import the CSS for this component

const products = [
  { id: 1, name: 'Product 1', price: 10.99, stock: 5, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/SiGEe8AAAAASUVORK5CYII=' },
  { id: 2, name: 'Product 2', price: 20.49, stock: 3, img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/SiGEe8AAAAASUVORK5CYII=' },
  // Add more products as needed
];

const MarketPage = () => {
  const { addToCart } = useContext(CartContext); // Obtener la función addToCart del contexto
  const [quantities, setQuantities] = useState({}); // Mantiene la cantidad seleccionada para cada producto

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10) || 1;
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    if (quantity > product.stock) {
      alert(`No hay suficiente stock para ${product.name}`);
    } else {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="market-container">
      <h1>Productos</h1>
      <div className="products-box">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="product-details">
              <p className="product-name">{product.name}</p>
              <p className="product-price">Precio: ${product.price.toFixed(2)}</p>
              <p>Stock disponible: {product.stock}</p>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantities[product.id] || 1}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                className="quantity-input"
              />
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;
