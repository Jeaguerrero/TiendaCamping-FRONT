import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate for redirecting
import '../styles/editList.css'; // Import the CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState({}); // State to hold the images by product id
  const navigate = useNavigate(); // For programmatic navigation

  // Function to fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token');  // Get the token from localStorage
        if (!token) {
          console.error("Token not found in localStorage");
          return;
        }

        const response = await fetch('http://localhost:4002/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Set the token in the header
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log(data); // Log the products data
        setProducts(data.content); // Assuming the products are in the "content" field
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to fetch image base64 data for each product and dynamically determine the MIME type
  const fetchImage = async (imageId) => {
    try {
      const token = localStorage.getItem('access_token');  // Get the token from localStorage
      const response = await fetch(`http://localhost:4002/images/${imageId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Set the token in the header
        },
      });

      const data = await response.json();

      if (!data || !data.file) {
        console.error(`No image data found for image ID: ${imageId}`);
        return null;
      }

      const base64Image = data.file;
      let mimeType = 'image/jpeg'; // Default to JPEG

      // Dynamically check for MIME type based on base64 prefix
      if (base64Image.startsWith('iVBOR')) {
        mimeType = 'image/png';
      } else if (base64Image.startsWith('/9j/4AAQSk')) {
        mimeType = 'image/jpeg';
      } else if (base64Image.startsWith('R0lGODlh')) {
        mimeType = 'image/gif';
      }

      return `data:${mimeType};base64,${base64Image}`;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  // Fetch images once products are fetched
  useEffect(() => {
    const loadImages = async () => {
      const productImages = {};

      for (const product of products) {
        const imageBase64 = await fetchImage(product.imageID);

        if (imageBase64) {
          productImages[product.id] = imageBase64;
        }
      }

      setImages(productImages);
    };

    if (products.length > 0) {
      loadImages();
    }
  }, [products]);  // This effect runs when the products are fetched

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('access_token'); // Get the token
      const response = await fetch(`http://localhost:4002/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Product deleted successfully');
        // Re-fetch the products after deletion
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        console.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Function to navigate to edit page
  const handleEdit = (productId) => {
    navigate(`/edit/${productId}`); // Redirect to edit page
  };

  return (
    <div className="editList">
      <h2>Product List</h2>
      <ul>
        {products.length === 0 ? (
          <li>No products available</li>
        ) : (
          products.map((product) => {
            const imageBase64 = images[product.id]; // Retrieve the image for this product

            return (
              <li key={product.id}>
                {imageBase64 ? (
                  <img
                    src={imageBase64}
                    alt={product.description}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  <span>No image available</span> // Display if no image is found
                )}
                <span className="productDescription">{product.description}</span>
                <span className="productPrice">${product.price.toFixed(2)}</span>
                <span className="productStock">Stock: {product.stock}</span>
                <span className="productCategory">
                  Category: {product.category.id} - {product.category.name}
                </span>
                <button
                  className="editButton"
                  onClick={() => handleEdit(product.id)} // Navigate to the edit page
                >
                  Edit
                </button>
                <button
                  className="deleteButton"
                  onClick={() => deleteProduct(product.id)} // Delete the product
                >
                  Delete
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ProductList;