import React, { useState, useRef } from "react";
import Todo from "./Todo"; // Assuming this is the component for rendering products
import "../../styles/form.css";


const Form = () => {
  const [product, setProduct] = useState({
    description: "",
    categoryId: "",
    stock: "",
    price: "",
    imageId: "1", // Default image ID is 1
  });

  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null); // Selected image file
  const [searchId, setSearchId] = useState(""); // State for searching product by ID
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited
  const hiddenFileInput = useRef(null); // File input reference

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Save the uploaded image file
  };

  // Handle image upload and product creation
  const handleUploadImage = () => {
    if (!imageFile) {
      alert("Por favor selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile); // Append the image file to the FormData object

    // Send image to backend to create it
    fetch("http://localhost:4002/images", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData, // Send the formData containing the image
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al subir la imagen");
        return response.json();
      })
      .then((imageData) => {
        // Update product with the image ID
        const newProduct = { ...product, imageId: imageData.imageId };

        // Send product data to backend
        fetch("http://localhost:4002/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(newProduct),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Error al crear el producto");
            return response.json();
          })
          .then((data) => {
            setProducts([...products, data]); // Add new product to list
          })
          .catch((error) => console.error("Error:", error.message));

        // Clear form fields
        setProduct({
          description: "",
          categoryId: "",
          stock: "",
          price: "",
          imageId: "1",
        });
        setImageFile(null);
      })
      .catch((error) => console.error("Error al subir la imagen:", error.message));
  };

  // Handle file input click
  const handleFileClick = () => {
    hiddenFileInput.current.click(); // Open the file input dialog
  };

  // Search product by ID
  const searchProduct = () => {
    const foundProduct = products.find((prod) => prod.id === searchId);
    if (foundProduct) {
      setEditingProduct(foundProduct);
    } else {
      alert("Producto no encontrado");
    }
  };

  // Save edited product
  const saveEdit = () => {
    const updatedProducts = products.map((prod) =>
      prod.id === editingProduct.id ? editingProduct : prod
    );
    setProducts(updatedProducts);
    setEditingProduct(null); // Clear editing state
  };

  // Delete product by ID
  const deleteById = () => {
    const updatedProducts = products.filter((prod) => prod.id !== editingProduct.id);
    setProducts(updatedProducts);
    setEditingProduct(null); // Clear editing state
  };

  // Handle input changes for editing product
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: value,
    });
  };

  return (
    <>
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

 {/*     <h2>Buscar Producto por ID</h2>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="button" onClick={searchProduct}>
          Buscar
        </button>
 */}  
        {editingProduct && (
          <>
            <h3>Editando Producto ID: {editingProduct.id}</h3>
            <label>Descripción</label>
            <input
              type="text"
              name="description"
              value={editingProduct.description}
              onChange={handleEditChange}
            />
            <label>ID Categoría</label>
            <input
              type="text"
              name="categoryId"
              value={editingProduct.categoryId}
              onChange={handleEditChange}
            />
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={editingProduct.stock}
              onChange={handleEditChange}
            />
            <label>Precio</label>
            <input
              type="number"
              name="price"
              value={editingProduct.price}
              onChange={handleEditChange}
            />
            <button type="button" onClick={saveEdit}>
              Guardar Cambios
            </button>
            <button type="button" onClick={deleteById}>
              Eliminar Producto
            </button>
          </>
        )}

        {/* Renderizar productos */}
        {products.map((prod) => (
          <Todo
            key={prod.id}
            img={prod.imageId} // Assuming you have the image URL or ID
            id={prod.id}
            description={prod.description}
            stock={prod.stock}
            price={prod.price}
            deleteTodo={deleteById}
          />
        ))}
      </form>
    </>
  );
};

export default Form;