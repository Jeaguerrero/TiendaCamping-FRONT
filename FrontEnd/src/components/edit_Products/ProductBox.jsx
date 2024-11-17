import React, { useState } from 'react';

const ProductBox = ({ product, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4002/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onUpdate(updatedProduct);
        setIsEditing(false);
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4002/products/${product.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(product.id);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-box">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedProduct.description}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })
            }
          />
          <input
            type="number"
            value={editedProduct.stock}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, stock: parseInt(e.target.value) })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{product.description}</h3>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>Category: {product.category?.description || 'N/A'}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ProductBox;
