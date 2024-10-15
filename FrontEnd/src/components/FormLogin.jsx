import "./Form.css"
import { useState } from "react"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export function FormLogin({ setUser }) {
    const [nombre, setNombre] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre === "" || contraseña === "") {
            setError(true);
            return;
        }
        setError(false);

        setUser([nombre])
        navigate('/home')
    };

    return (
        <div className="wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Ingresa a tu cuenta</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
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
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
                <button type="submit">Iniciar sesión</button>
                {error && <p>Por favor, rellena todos los campos</p>}
                <div className="register-link">
                    <p>
                        ¿Aún no tenés cuenta? <a href="#">¡Registrate acá!</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default FormLogin;
