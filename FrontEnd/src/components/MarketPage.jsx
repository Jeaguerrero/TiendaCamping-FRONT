import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux/productSlice';
import { fetchImages } from '../Redux/imageSlice'; 
import { CartContext } from './CartManager';
import SearchBar from './productos/SearchBar';
import '../styles/MarketPage.css'; // Import the CSS file

const MarketPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const { items: images, imageLoading, imageError } = useSelector((state) => state.images);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      products.forEach((product) => {
        if (product.imageId) {
          dispatch(fetchImages(product.imageId));
        }
      });
    }
  }, [dispatch, products]);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Math.min(value, products.find((p) => p.id === productId)?.stock || 1)),
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    if (quantity > product.stock) {
      alert(`No hay suficiente stock para ${product.description}`);
    } else {
      addToCart(product, quantity);
    }
  };

  if (loading || imageLoading) {
    return <div>Cargando productos...</div>;
  }

  if (error || imageError) {
    return <div>Error al cargar los productos o imágenes.</div>;
  }

  return (
    <div className="market-container">
      <h1>Productos</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="products-box">
        {products
          .filter((product) =>
            product.description?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={`data:image/jpeg;base64,${images?.[product.imageId] || ''}`}
                alt={product.description || 'Producto sin descripción'}
                className="product-image"
              />
              <div className="product-details">
                <p className="product-name">{product.description || 'Sin descripción'}</p>
                <p className="product-price">Precio: ${product.price?.toFixed(2) || '0.00'}</p>
                <p>Stock disponible: {product.stock || 0}</p>
                <input
                  type="number"
                  min="1"
                  max={product.stock || 1}
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                  className="quantity-input"
                />
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart-button"
                  disabled={product.stock <= 0}
                >
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
