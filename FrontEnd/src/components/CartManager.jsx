import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addToCart, removeFromCart, clearCart } from '../Redux/productSlice'; // Make sure you import your redux actions

const CartManager = () => {
  const dispatch = useDispatch();
  const { cartItems, products, loading, error } = useSelector((state) => state.products); // Assuming cartItems are stored here
  const { products: productList, loading: productLoading, error: productError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products on load
  }, [dispatch]);

  const handleAddToCart = (product, quantity) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    const productInStock = productList.find(item => item.id === product.id);

    if (quantity > productInStock.stock) {
      alert(`Not enough stock for ${product.name}. Available stock: ${productInStock.stock}`);
      return;
    }

    if (existingProduct) {
      const totalQuantityInCart = existingProduct.quantity + quantity;
      dispatch(addToCart({ product, quantity: totalQuantityInCart }));
    } else {
      dispatch(addToCart({ product, quantity }));
    }

    const updatedProducts = productList.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - quantity } : p
    );
    dispatch(updateProducts(updatedProducts)); // Update products with new stock
  };

  const handleRemoveFromCart = (id) => {
    const removedProduct = cartItems.find(item => item.id === id);
    if (removedProduct) {
      const updatedProducts = productList.map(p =>
        p.id === removedProduct.id ? { ...p, stock: p.stock + removedProduct.quantity } : p
      );
      dispatch(updateProducts(updatedProducts)); // Update products with stock increase
      dispatch(removeFromCart(id)); // Remove from cart
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      {loading || productLoading ? (
        <div>Loading...</div>
      ) : error || productError ? (
        <div>Error: {error || productError}</div>
      ) : (
        <div>
          <h1>Cart</h1>
          {cartItems.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
            </div>
          ))}
          <button onClick={handleClearCart}>Clear Cart</button>
          {/* Render products with add to cart button */}
          <h2>Products</h2>
          {productList.map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
              <button onClick={() => handleAddToCart(product, 1)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartManager;
