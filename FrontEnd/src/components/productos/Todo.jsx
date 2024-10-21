import React from 'react';

const Todo = ({ todo, index, deleteTodo }) => {
  return (
    <div>
      <span>{todo}</span>
      <button onClick={() => deleteTodo(index)}>Eliminar</button>
    </div>
  );
};

export default Todo;
