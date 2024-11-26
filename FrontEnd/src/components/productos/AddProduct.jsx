import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Redux/productSlice";
import { createImage } from "../../Redux/imageSlice";
import "../../styles/form.css";

const Form = () => {
  const [product, setProduct] = useState({
    description: "",
    categoryId: "",
    stock: "",
    price: "",
    imageId: null, // Initially no image
  });

  const [imageFile, setImageFile] = useState(null); // Selected image file
  const hiddenFileInput = useRef(null); // File input reference
  const dispatch = useDispatch();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Save the uploaded image file
  };

  // Handle file input click
  const handleFileClick = () => {
    hiddenFileInput.current.click(); // Open the file input dialog
  };

  // Handle image upload and product creation
  const handleUploadImage = async () => {
    if (!imageFile) {
      alert("Por favor selecciona una imagen");
      return;
    }

    try {
      // Dispatch the image upload action
      const uploadedImage = await dispatch(createImage(imageFile));

      if (uploadedImage.payload) {
        // Get the image ID from the response
        const imageId = uploadedImage.payload.id;

        // Create the product with the imageId
        const newProduct = { ...product, imageId };

        // Dispatch the action to create the product
        await dispatch(createProduct(newProduct));

        // Reset form fields
        setProduct({
          description: "",
          categoryId: "",
          stock: "",
          price: "",
          imageId: null,
        });
        setImageFile(null);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error while creating product or uploading image:", error.message);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Agregar Producto</h1>

      <label>Nombre del Producto</label>
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
      />

      <label>ID Categoría</label>
      <input
        type="text"
        name="categoryId"
        value={product.categoryId}
        onChange={handleChange}
      />

      <label>Stock</label>
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
      />

      <label>Precio</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
      />

      <label>Imagen</label>
      <div onClick={handleFileClick} style={{ cursor: "pointer" }}>
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button type="button">
          {imageFile ? imageFile.name : "Subir imagen"}
        </button>
      </div>

      <button type="button" onClick={handleUploadImage}>
        Agregar Producto
      </button>
    </form>
  );
};

export default Form;
