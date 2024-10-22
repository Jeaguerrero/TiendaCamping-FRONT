import "./Form.css";
import { useState, useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export function FormLogin({ setUser }) {
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
                setError(errorData.message || "Error en la autenticación"); // Mostrar mensaje de error específico
                return;
            }

            const responseData = await response.json();
            const accessToken = responseData.access_token;

            // Almacenar el token en el almacenamiento local
            localStorage.setItem("access_token", accessToken);

            navigate("/home");
        } catch (err) {
            console.error("Error durante el inicio de sesión:", err);
            setError("Error en el proceso de inicio de sesión. Intenta nuevamente."); // Mensaje genérico para el usuario
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            console.log("Token almacenado:", token);
        }
    }, []);

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
                {error && <p>{error}</p>} {/* Mensaje de error */}
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
