// src/components/MarketPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartManager';
import './MarketPage.css'; // Import the CSS for this component

const MarketPage = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [quantities, setQuantities] = useState({}); // Mantiene la cantidad seleccionada para cada producto
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Obtener el token de localStorage
        const response = await fetch('http://localhost:4002/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Incluir el token en los headers
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching products'); // Manejo de errores
        }
        const data = await response.json();
        setProducts(data.content); // Asigna la lista de productos al estado
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };

    fetchProducts();
  }, []); // Dependencia vacía para ejecutar solo una vez al montar el componente

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10) || 1;
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    if (quantity > product.stock) {
      alert(`No hay suficiente stock para ${product.description}`);
    } else {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>; // Mensaje de carga
  }

  return (
    <div className="market-container">
      <h1>Productos</h1>
      <div className="products-box">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.img || 'default-image-url.png'} alt={product.description || 'Product Image'} className="product-image" />
            <div className="product-details">
              <p className="product-name">{product.description || 'Sin descripción'}</p>
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
