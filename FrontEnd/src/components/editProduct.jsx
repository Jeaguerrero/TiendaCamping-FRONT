import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, editProduct } from "../Redux/productSlice";
import { fetchImages } from "../Redux/imageSlice";
import "../styles/form.css"; // Usar form.css para los estilos generales

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { items: images } = useSelector((state) => state.images);

  const [formData, setFormData] = useState({
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageID: "",
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch product list if not already loaded
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    // Populate form data for the selected product
    const product = products.find((p) => p.id === parseInt(productId, 10));
    if (product) {
      setFormData({
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.category.id,
        imageID: product.imageId,
      });

      // Fetch image if present
      if (product.imageId) {
        dispatch(fetchImages(product.imageId));
      }
    }
  }, [products, productId, dispatch]);

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
      let imageId = formData.imageID;

      // Upload image if a new file is selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const uploadResponse = await fetch("http://localhost:4002/images", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: imageFormData,
        });

        if (!uploadResponse.ok) throw new Error("Failed to upload image");

        const uploadData = await uploadResponse.json();
        imageId = uploadData.id;
      }

      // Update product using Redux thunk
      dispatch(editProduct({ ...formData, imageID: imageId, id: productId }));

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
          {formData.imageID && images[formData.imageID] ? (
            <img
              src={images[formData.imageID]}
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
