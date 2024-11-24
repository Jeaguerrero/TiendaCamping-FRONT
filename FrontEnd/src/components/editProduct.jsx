import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/form.css'; // Usar form.css para los estilos generales

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

  // Fetch product and categories
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`http://localhost:4002/products/${productId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch product details");

        const product = await response.json();
        setFormData({
          description: product.description,
          price: product.price,
          stock: product.stock,
          categoryId: product.category.id,
          imageID: product.imageID,
        });

        // Fetch current image
        if (product.imageID) {
          const imageResponse = await fetch(`http://localhost:4002/images/${product.imageID}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const imageData = await imageResponse.json();
          setCurrentImage(`data:image/jpeg;base64,${imageData.file}`);
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
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data.content.map(category => ({
          id: category.id,
          name: category.description,
        })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  // Handle changes in inputs
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

      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const uploadResponse = await fetch("http://localhost:4002/images", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: imageFormData,
        });

        if (!uploadResponse.ok) throw new Error("Failed to upload image");

        const uploadData = await uploadResponse.json();
        imageId = uploadData.id;
      }

      const updateResponse = await fetch(`http://localhost:4002/products/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, imageID: imageId }),
      });

      if (!updateResponse.ok) throw new Error("Failed to update product");

      alert("Producto actualizado con éxito");
      navigate("/edit");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="form">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nombre del Producto:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            className="form-select"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Imagen actual:</label>
          {currentImage ? (
            <img
              src={currentImage}
              alt="Imagen actual"
              className="form-image"
            />
          ) : (
            <span className="form-no-image">Sin Imagen disponible</span>
          )}
        </div>
        <div className="form-group">
          <label>Imagen nueva:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-file-input"
          />
        </div>
        <button type="submit" className="form-button">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
