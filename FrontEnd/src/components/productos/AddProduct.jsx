import React, { useState, useRef } from "react";
import Todo from "./Todo"; // Asumo que este componente está para renderizar los productos

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
  const [searchId, setSearchId] = useState(""); // Estado para buscar producto por ID
  const [editingProduct, setEditingProduct] = useState(null); // Estado para el producto que está siendo editado
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
    if (!imageFile) {
      alert("Por favor selecciona una imagen");
      return;
    }

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

  const handleClick = () => {
    hiddenFileInput.current.click(); // Abrir el selector de archivos
  };

  // Función para buscar el producto por su ID
  const searchProduct = () => {
    const foundProduct = products.find((prod) => prod.id === searchId);
    if (foundProduct) {
      setEditingProduct(foundProduct);
    } else {
      alert("Producto no encontrado");
    }
  };

  // Función para guardar cambios en el producto
  const saveEdit = () => {
    const updatedProducts = products.map((prod) =>
      prod.id === editingProduct.id ? editingProduct : prod
    );
    setProducts(updatedProducts);
    setEditingProduct(null); // Limpiar el producto que está siendo editado
  };

  // Función para eliminar el producto por su ID
  const deleteById = () => {
    const updatedProducts = products.filter((prod) => prod.id !== editingProduct.id);
    setProducts(updatedProducts);
    setEditingProduct(null); // Limpiar el producto que está siendo editado
  };

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

        <h2>Buscar Producto por ID</h2>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="button" onClick={searchProduct}>Buscar</button>

        {editingProduct && (
          <>
            <h3>Editando Producto ID: {editingProduct.id}</h3>

            <label>Descripción</label> <br />
            <input
              type="text"
              name="description"
              value={editingProduct.description}
              onChange={handleEditChange}
            /> <br />

            <label>ID Categoría</label> <br />
            <input
              type="text"
              name="categoryId"
              value={editingProduct.categoryId}
              onChange={handleEditChange}
            /> <br />

            <label>Stock</label> <br />
            <input
              type="number"
              name="stock"
              value={editingProduct.stock}
              onChange={handleEditChange}
            /> <br />

            <label>Precio</label> <br />
            <input
              type="number"
              name="price"
              value={editingProduct.price}
              onChange={handleEditChange}
            /> <br />

            <button type="button" onClick={saveEdit}>Guardar Cambios</button>
            <button type="button" onClick={deleteById}>Eliminar Producto</button>
          </>
        )}
        
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
            deleteTodo={deleteById}
          />
        ))}
      </form>
    </>
  );
};

export default Form;
