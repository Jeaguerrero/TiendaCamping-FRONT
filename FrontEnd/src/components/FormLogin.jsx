
<div className="form-container">
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
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
        <button type="submit">Iniciar sesión</button>
        {error && <p>Por favor, rellena todos los campos</p>}
        <div className="register-link">
            <p>
                ¿Aún no tenés cuenta? <Link to="/register">¡Registrate acá!</Link>
            </p>
        </div>
    </form>
</div>
