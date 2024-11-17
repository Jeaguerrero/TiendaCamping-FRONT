import React, { useEffect, useState } from 'react';
import ProductBox from './ProductBox';

const EditProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const token = localStorage.getItem("access_token"); // Retrieve token from localStorage
  
      if (!token) {
        console.error("No access token found.");
        return;
      }
  
      const response = await fetch("http://localhost:4002/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.content; // Adjust based on the API response structure
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4002/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.content || []); // Extract `content` from response
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (products.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <div className="edit-product-list">
      {products.map((product) => (
        <ProductBox
          key={product.id}
          product={product}
          onUpdate={(updatedProduct) =>
            setProducts((prev) =>
              prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
            )
          }
          onDelete={(productId) =>
            setProducts((prev) => prev.filter((p) => p.id !== productId))
          }
        />
      ))}
    </div>
  );
};

export default EditProductList;
