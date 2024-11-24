import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/editProduct.css'; // Import the CSS file


const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageID: "",
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`http://localhost:4002/products/${productId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const product = await response.json();
        setFormData({
          description: product.description,
          price: product.price,
          stock: product.stock,
          categoryId: product.category.id,
          imageID: product.imageID,
        });

        // Fetch and set current image
        if (product.imageID) {
          const imageResponse = await fetch(`http://localhost:4002/images/${product.imageID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const imageData = await imageResponse.json();
          const base64Image = `data:image/jpeg;base64,${imageData.file}`;
          setCurrentImage(base64Image);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:4002/categories", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(
          data.content.map((category) => ({
            id: category.id,
            name: category.description,
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      let imageId = formData.imageID;

      // Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await fetch("http://localhost:4002/images", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const uploadData = await uploadResponse.json();
        imageId = uploadData.id; // Get new image ID
      }

      // Update product
      const updateResponse = await fetch(`http://localhost:4002/products/${productId}`, {
        method: "PUT",
        headers: {
          
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageID: imageId,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update product");
      }

      alert("Product updated successfully");
      navigate("/edit");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </label>

        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Category:
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Current Image:
          {currentImage ? (
            <img
              src={currentImage}
              alt="Current product"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <span>No image available</span>
          )}
        </label>

        <label>
          Upload New Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;