import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el email de recuperación
        alert(`Se ha enviado un correo a ${email}`);
    };

    return (
        <div className="wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Recupera tu contraseña</h1>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar correo</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
