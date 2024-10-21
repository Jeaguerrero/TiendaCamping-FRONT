import { useState } from "react";
import Todo from "./Todo";

const Form = () => {
  const [product, setProduct] = useState({
    nombre: "",
    id: "",
    description: "",
    idCategory: "",
    stock: "",
    price: "",
    image: ""
  });

  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { nombre, id, description, idCategory, stock, price, image } = product;

    // Validar campos vacíos
    if (
      nombre.trim() === "" ||
      id.trim() === "" ||
      description.trim() === "" ||
      idCategory.trim() === "" ||
      stock.trim() === "" ||
      price.trim() === "" ||
      image.trim() === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (isEditing) {
      // Actualizar el producto existente
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = { ...product };
      setProducts(updatedProducts);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      // Agregar nuevo producto
      setProducts([...products, { ...product }]);
    }

    // Limpiar el formulario
    setProduct({
      nombre: "",
      id: "",
      description: "",
      idCategory: "",
      stock: "",
      price: "",
      image: ""
    });
  };

  const deleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const editProduct = (index) => {
    setProduct(products[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nombre del Producto</label> <br />
        <input
          type="text"
          name="nombre"
          value={product.nombre}
          onChange={handleChange}
        /> <br />
        
        <label>ID del Producto</label> <br />
        <input
          type="text"
          name="id"
          value={product.id}
          onChange={handleChange}
        /> <br />

        <label>Descripción</label> <br />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
        /> <br />

        <label>ID Categoría</label> <br />
        <input
          type="text"
          name="idCategory"
          value={product.idCategory}
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

        <label>Imagen JPG</label> <br />
        <input
          type="file"
          name="image"
          value={product.image}
          onChange={handleChange}
        /> <br />

        <button type="button" onClick={handleClick}>
          {isEditing ? "Actualizar Producto" : "Agregar Producto"}
        </button>

        <ul>
          {products.map((prod, index) => (
            <li key={index}>
              <Todo
                todo={`${prod.id} - ${prod.description}`}
                index={index}
              />
              <button onClick={() => editProduct(index)}>Editar</button>
              <button onClick={() => deleteProduct(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default Form;
