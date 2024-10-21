import React, { useContext, useState } from 'react';
import { CartContext } from './CartManager';

const ProductList = () => {
  const { products, addToCart } = useContext(CartContext); // Obtener los productos y la función addToCart del contexto
  const [quantities, setQuantities] = useState({}); // Mantiene la cantidad seleccionada para cada producto

  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value, 10) || 1;
    setQuantities({ ...quantities, [productId]: newQuantity });
  };

  // Función para manejar la adición al carrito
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    if (quantity > product.stock) {
      alert(`No hay suficiente stock para ${product.name}`);
    } else {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: '20px' }}>
          <p>{product.name} - ${product.price}</p>
          <p>Stock disponible: {product.stock}</p>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantities[product.id] || 1}
            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
          />
          <button onClick={() => handleAddToCart(product)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
