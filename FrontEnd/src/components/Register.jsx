import React, { useState } from 'react';

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("USER"); // Rol predeterminado: USER
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Preparar los datos del usuario para enviar al backend
        const userData = {
            nombre,
            apellido,
            email,
            password,
            rol, // Enviar el rol seleccionado
        };

        try {
            // Hacer la llamada a la API del backend
            const response = await fetch("http://localhost:4002/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Indicar que enviamos JSON
                },
                body: JSON.stringify(userData), // Convertir los datos a JSON
            });

            if (!response.ok) {
                // Manejar error si la respuesta no es exitosa
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el registro");
            }

            // Si la respuesta es exitosa
            setSuccess(true);
            alert(`Usuario ${nombre} ${apellido} registrado con éxito como ${rol}!`);
            // Aquí podrías redirigir al usuario a otra página o limpiar el formulario
        } catch (err) {
            console.error("Error durante el registro:", err);
            setError(err.message);
        }
    };

    return (
        <div className="wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Crear cuenta</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>¡Registro exitoso!</p>}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-box">
                    <label htmlFor="rol">Rol:</label>
                    <select
                        id="rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
