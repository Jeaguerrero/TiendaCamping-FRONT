import React, { useState, useRef } from "react";
import Todo from "./Todo";
 
const Form = () => {
  const [product, setProduct] = useState({
    description: "",
    categoryId: "",
    stock: "",
    price: "",
    imageId: "", // Para almacenar el ID de la imagen
  });
 
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null); // Archivo de imagen seleccionado
  const hiddenFileInput = useRef(null); // Referencia para el input de archivos
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Guardar el archivo de imagen cargado
  };
 
  const handleClickUploadImage = () => {
    // Leer el archivo de imagen y convertirlo a base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(",")[1]; // Solo obtener la parte base64
 
      // Enviar la imagen al backend para crearla
      fetch("http://localhost:4002/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ file: base64Image }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al subir la imagen");
          }
          return response.json(); // Asumimos que el backend devuelve el ID de la imagen
        })
        .then((imageData) => {
          // Actualizar el producto con el ID de la imagen
          const newProduct = {
            ...product,
            imageId: imageData.id, // Usar el ID de la imagen obtenida
          };
 
          // Enviar el producto al backend
          fetch("http://localhost:4002/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(newProduct),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al crear el producto");
              }
              return response.json();
            })
            .then((data) => {
              setProducts([...products, data]); // Añadir el nuevo producto a la lista
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
 
          // Limpiar el formulario
          setProduct({
            description: "",
            categoryId: "",
            stock: "",
            price: "",
            imageId: "",
          });
          setImageFile(null);
        })
        .catch((error) => {
          console.error("Error al subir la imagen:", error.message);
        });
    };
 
    reader.readAsDataURL(imageFile); // Convertir el archivo a base64
  };
 
  const handleClick = (event) => {
    hiddenFileInput.current.click(); // Abrir el selector de archivos
  };
 
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2>Agregar Producto</h2>
        <label>Nombre del Producto</label> <br />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
        /> <br />
 
        <label>ID Categoría</label> <br />
        <input
          type="text"
          name="categoryId"
          value={product.categoryId}
          onChange={handleChange}
        /> <br />
 
        <label>Stock</label> <br />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        /> <br />
 
        <label>Precio</label> <br />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        /> <br />
 
        <label>Imagen</label> <br />
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={handleImageChange} // Manejar la carga del archivo
          />
          <button type="button" onClick={handleClick}>
            {imageFile ? imageFile.name : "Subir imagen"}
          </button>
        </div>
        <br />
 
        <button type="button" onClick={handleClickUploadImage}>Agregar Producto</button>
 
        {/* Renderizar productos */}
        {products.map((prod, index) => (
          <Todo
            key={prod.id}
            img={prod.imageId} // Si necesitas mostrar la imagen, asumiendo que tienes la URL o ID
            id={prod.id}
            description={prod.description}
            stock={prod.stock}
            price={prod.price}
            index={index}
            deleteTodo={deleteProduct}
          />
        ))}
      </form>
    </>
  );
};
 
export default Form;