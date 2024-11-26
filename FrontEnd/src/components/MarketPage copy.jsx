import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import { fetchImages } from '../Redux/imageSlice'; 
import { CartContext } from './CartManager';
import SearchBar from './productos/SearchBar';
import '../styles/MarketPage.css'; // Import the CSS file

const MarketPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products); // Access products state
  const { images } = useSelector((state) => state.images); // Access images state
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // Fetch images after products are fetched
    if (products && products.length > 0) {
      products.forEach((product) => {
        if (product.imageID) {
          dispatch(fetchImages(product.imageID)); // Dispatch fetchImages action for each product
        }
      });
    }
  }, [dispatch, products]);

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
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar los productos: {error}</div>;
  }

  const filteredProducts = products.filter(product =>
    product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="market-container">
      <h1>Productos</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="products-box">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img 
              src={images[product.imageID] || 'default-image-url.png'} 
              alt={product.description || 'Product Image'} 
              className="product-image" 
            />
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
