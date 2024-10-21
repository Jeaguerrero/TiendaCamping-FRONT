import React from 'react';
import Logo from './Logo'; // Importa el componente Logo
import NavLinks from './NavLinks'; // Importa el componente NavLinks
import CartIcon from './CartIcon'; // Importa el componente CartIcon
import './Navbar.css'; // Importa los estilos CSS para la barra de navegación


function Navbar() {
  return (
    <header className="navbar">
      <Logo />
      <NavLinks />
      <CartIcon />
    </header>
  );
}

export default Navbar;