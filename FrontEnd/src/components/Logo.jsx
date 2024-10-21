import React from 'react';
import { Link } from 'react-router-dom'; // Para enlazar el logo a la página de inicio
import './Logo.css'; // Importa los estilos CSS para el logo

function Logo() {
  return (
    <Link to="/" className="logo">
      TiendaCamping
    </Link>
  );
}

export default Logo;