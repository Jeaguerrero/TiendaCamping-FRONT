import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartManager';

const Navbar = ({ toggleCart }) => {
  const { cartItems } = useContext(CartContext);

  // Contar la cantidad total de productos en el carrito
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <h2 className="navbar-brand">Camping Marketplace</h2>
      <ul className="navbar-links">
        {/* Enlace a "Inicio" */}
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {/* Enlace a "Productos" */}
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        {/* Enlace a "Login" */}
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* Botón para abrir/cerrar el carrito */}
        <li>
          <button onClick={toggleCart} className="cart-button-navbar">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <span className="cart-count">{cartItemCount}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
