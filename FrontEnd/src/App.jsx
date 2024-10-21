// src/App.jsx
import React from 'react';
import './App.css';
import MarketPage from './components/MarketPage';

function App() {
  return (
    <div>
      <div className='title'>Camping Marketplace</div>
      <div><MarketPage /> {/* Renderiza tu componente */}</div>
    </div>
  );
}

export default App;
