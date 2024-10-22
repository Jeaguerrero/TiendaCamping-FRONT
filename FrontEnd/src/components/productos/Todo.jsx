import React from 'react';
import './Todo.css';

function isBase64Image(str) {
  return str.startsWith('data:image/');
}


const Base64Image = ({ img }) => {
  console.log('Image string:', img); // Debugging

  if (!isBase64Image(img)) {
    return <div>Imagen no disponible</div>;
  }

  return (
    <div>
      <img src={img} alt="Product Image" style={{ width: '50px', height: '50px' }} />
    </div>
  );
};

const Todo = ({ id, description, price, stock, index, deleteTodo, img }) => {
  return (
    <div className="todo-container">
      <span>{description}</span>
      <Base64Image img={img} />
      <span className="price">Price: ${price}</span>
      <span className="stock">Stock: {stock}</span>
      <span>ID: {id}</span>
      <button onClick={() => deleteTodo(index)}>Eliminar</button>
    </div>
  );
};


export default Todo;
