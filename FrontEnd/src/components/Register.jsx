import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Redux/accountManagment/registerSlice';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('USER'); // Default role: USER

    const dispatch = useDispatch();
    const { authToken, loading, error } = useSelector((state) => state.auth); // Access Redux state

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare user data for the backend
        const userData = {
            firstname: nombre,
            lastname: apellido,
            email,
            password,
            role: rol,
        };

        // Dispatch the register action
        dispatch(register(userData));
    };

    return (
        <div className="wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Crear cuenta</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {authToken && <p style={{ color: 'green' }}>¡Registro exitoso!</p>}
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
};

export default Register;
