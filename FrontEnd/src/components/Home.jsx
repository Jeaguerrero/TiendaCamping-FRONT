import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); 
        navigate('/'); 
    };

    return (
        <div className="home-page">
            <h1>Bienvenido</h1>
            
            {user ? <h2>{user}</h2> : <h2>Invitado</h2>}
            
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}

export default Home;
