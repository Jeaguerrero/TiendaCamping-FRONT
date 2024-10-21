import { useState } from "react";
import Todo from "./Todo";

const Form = () => {
  const [product, setProduct] = useState({
    id: "",
    description: "",
    idCategory: "",
    stock: "",
    price: "",
    image: ""
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { id, description, idCategory, stock, price, image } = product;

    // Validar campos vacíos
    if (
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

    // Agregar producto a la lista
    setProducts([...products, { ...product }]);

    // Limpiar el formulario
    setProduct({
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

        <label>URL Imagen</label> <br />
        <input
          type="file"
          name="image"
          value={product.image}
          onChange={handleChange}
        /> <br />

        <button type="button" onClick={handleClick}>Agregar Producto</button>
        
        {products.map((prod, index) => (
          <Todo
            key={index}
            todo={`${prod.id} - ${prod.description}`}
            index={index}
            deleteTodo={deleteProduct}
          />
        ))}
      </form>
    </>
  );
};

export default Form;