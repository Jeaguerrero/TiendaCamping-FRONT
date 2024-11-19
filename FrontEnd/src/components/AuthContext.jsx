import React, { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

// Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el email del usuario
  const [userRole, setUserRole] = useState(null); // Estado para el rol del usuario

  // Verificar y decodificar el token JWT al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser(decoded.sub); // Establece el email del usuario
        setUserRole(decoded.role); // Establece el rol del usuario
      } catch (err) {
        console.error("Error al decodificar el token:", err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
