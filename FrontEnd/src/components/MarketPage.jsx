import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartManager';
import SearchBar from './productos/SearchBar';
import '../styles/MarketPage.css'; // Import the CSS file

const MarketPage = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({});
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4002/products', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        setProducts(data.content);
        await fetchProductImages(data.content);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchProductImages = async (products) => {
    const imagePromises = products.map(async (product) => {
      if (product.imageID) {
        try {
          const imageResponse = await fetch(`http://localhost:4002/images/${product.imageID}`, {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
          });
          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            return { [product.id]: `data:image/jpeg;base64,${imageData.file}` };
          } else {
            return { [product.id]: null };
          }
        } catch (error) {
          return { [product.id]: null };
        }
      }
      return { [product.id]: null };
    });

    const imagesData = await Promise.all(imagePromises);
    const imagesMap = imagesData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setImages(imagesMap);
  };

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
              src={images[product.id] || 'default-image-url.png'} 
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