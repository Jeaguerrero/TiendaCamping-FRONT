import React from 'react';
import AddProduct from './components/productos/AddProduct';
import Register from './components/Register';
import FormLogin from './components/FormLogin';
import './App.css'; // Importa los estilos globales de la aplicación

function App() {
  return (
    
      <div className="app">
        <FormLogin /> 
        <Register />
        <AddProduct />
        
    {/* Renderiza la barra de navegación */}
       
      </div>
   
  );
}


export default App;