import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "./CartManager";
import jwt_decode from "jwt-decode";
import "../styles/Navbar.css";

// Si usas una imagen desde `src/assets/images`
// import logo from "../assets/images/logo.png";

const Navbar = ({ toggleCart }) => {
  const { cartItems } = useContext(CartContext);
  const [menuVisible, setMenuVisible] = useState(false); // Estado para mostrar/ocultar el menú
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario
  const [userName, setUserName] = useState(null); // Estado para almacenar el nombre del usuario
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("access_token");
    console.log("Rol actual:", userRole);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        setUserRole(decoded.role); // Establecer el rol del usuario
        setUserName(decoded.sub); // Establecer el email o nombre del usuario (según lo configurado en el token)
      } catch (err) {
        console.error("Error al decodificar el token:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    // Eliminar los datos del usuario de localStorage
    localStorage.removeItem("access_token");

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Evitar que el clic en el nombre cierre el menú
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".user-menu")) {
        closeMenu();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Contar la cantidad total de productos en el carrito
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      {/* Logo en lugar del título */}
      <Link to="/" className="navbar-brand">
        {/* Si la imagen está en `public` */}
        <img src="/images/Logo4.png" alt="Camping Marketplace Logo" className="navbar-logo" />
        
        {/* Si la imagen está en `src/assets/images` */}
        {/* <img src={logo} alt="Camping Marketplace Logo" className="navbar-logo" /> */}
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        {/* Inicio Mini Menu */}
        <li>
          {userName ? (
            <div className="user-menu">
              <Link
                to="#"
                onClick={toggleMenu}
                className="user-email navbar-link"
              >
                {userName}
              </Link>
              {menuVisible && (
                <ul className="dropdown-menu">
                  {/* Menú para todos los usuarios */}
                  {userRole === "USER" && (
                    <>
                      <li onClick={closeMenu}>
                        <Link to="/mis-compras" className="dropdown-item">
                          Mis compras
                        </Link>
                      </li>
                    </>
                  )}
                  {/* Menú adicional para administradores */}
                  {userRole === "ADMIN" && (
                    <>
                      <li onClick={closeMenu}>
                        <Link to="/agregar" className="dropdown-item">
                          Cargar Productos
                        </Link>
                      </li>
                      <li onClick={closeMenu}>
                        <Link to="/edit" className="dropdown-item">
                          Editar Productos
                        </Link>
                      </li>
                      <li onClick={closeMenu}>
                        <Link to="/ventas" className="dropdown-item">
                          Ventas
                        </Link>
                      </li>
                    </>
                  )}
                  <li onClick={() => { handleLogout(); closeMenu(); }} className="dropdown-item">
                    Cerrar sesión
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        {/* Fin Mini Menu */}
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
