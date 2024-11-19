import React, { useContext, useState } from 'react';
import { CartContext } from './CartManager';
import SearchBar from './productos/SearchBar'; // Importa la SearchBar
import '../styles/MarketPage.css'; // Importa el CSS para este componente

const MarketPage = () => {
  const { products, addToCart, loading } = useContext(CartContext); // Obtiene productos y addToCart del contexto
  const [quantities, setQuantities] = useState({}); // Mantiene la cantidad seleccionada para cada producto
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10) || 1;
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    if (quantity > product.stock) {
      alert(`No hay suficiente stock para ${product.description}`);
    } else {
      addToCart(product, quantity); // Actualiza el stock en el contexto global
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>; // Mensaje de carga
  }

  // Filtra los productos según la consulta de búsqueda
  const filteredProducts = products.filter(product =>
    product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="market-container">
      <h1>Productos</h1>
      <SearchBar setSearchQuery={setSearchQuery} /> {/* Implementa la SearchBar aquí */}
      <div className="products-box">
        {filteredProducts.map((product) => (
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
