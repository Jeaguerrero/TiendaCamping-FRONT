import React, { useState } from "react";
import "../styles/Form.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { authenticate } from "../Redux/accountManagment/authenticacionSlice";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access Redux state
  const { authToken, loading, error: reduxError } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || contraseña === "") {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    // Dispatch the authenticate thunk
    dispatch(authenticate({ email, password: contraseña }))
      .unwrap()
      .then((response) => {
        const accessToken = response.access_token;

        // Decode the token
        const decodedToken = jwtDecode(accessToken);
        console.log("Token decodificado:", decodedToken);

        // Extract email
        const userEmail = decodedToken.sub;

        // Store token and user data in localStorage
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user_name", userEmail);

        // Redirect to the home page
        navigate("/home");
      })
      .catch((err) => {
        console.error("Error en el inicio de sesión:", err);
        setError("Error en el proceso de inicio de sesión. Intenta nuevamente.");
      });
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
        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
        {/* Show error messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {reduxError && <p style={{ color: "red" }}>{reduxError}</p>}
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
