import React, { useState } from "react";
import "../styles/Form.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAppContext } from "./AppContext";
import jwtDecode from "jwt-decode";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { refreshProducts } = useAppContext(); // Importa la función para actualizar productos

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || contraseña === "") {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4002/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: contraseña }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error en la autenticación");
        return;
      }

      const responseData = await response.json();
      const accessToken = responseData.access_token;

      // Decodificar el token
      const decodedToken = jwtDecode(accessToken);
      console.log("Token decodificado:", decodedToken);

      // Extraer el correo electrónico
      const userEmail = decodedToken.sub;

      // Guardar el token y el correo en localStorage
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_name", userEmail);

      // Actualizar el usuario en el estado global
      setUser(userEmail);

      // Actualizar los productos después del inicio de sesión
      await refreshProducts();

      // Redirigir al usuario al inicio
      navigate("/home");
    } catch (err) {
      console.error("Error durante el inicio de sesión:", err);
      setError("Error en el proceso de inicio de sesión. Intenta nuevamente.");
    }
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Ingresa a tu cuenta</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUserAlt className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Mantener sesión iniciada
          </label>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
        <button type="submit">Iniciar sesión</button>
        {error && <p>{error}</p>}
        <div className="register-link">
          <p>
            ¿Aún no tienes cuenta? <Link to="/register">¡Regístrate acá!</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
