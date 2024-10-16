// src/App.jsx
import React from 'react';
import AddProduct from './components/AddProduct'; // Importa tu componente

function App() {
  return (
    <div>
      <h1>Camping Marketplace</h1>
      <AddProduct /> {/* Renderiza tu componente */}
    </div>
  );
}

export default App;
