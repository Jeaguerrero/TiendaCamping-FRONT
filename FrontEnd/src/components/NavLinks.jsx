import React from 'react';
import { Link } from 'react-router-dom';


function NavLinks() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">INICIO</Link>
        </li>
        <li>
          <Link to="/productos">PRODUCTOS</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavLinks;