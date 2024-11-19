import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserPurchases = () => {
  const { user } = useAuth(); // Obtenemos el usuario del contexto
  const [purchases, setPurchases] = useState([]); // Estado para las compras del usuario

  useEffect(() => {
    // Función para cargar las compras del usuario
    const fetchUserPurchases = async () => {
      try {
        const response = await fetch("http://localhost:4002/api/v1/users/purchases", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Enviar el token JWT
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar las compras del usuario");
        }

        const data = await response.json();
        setPurchases(data); // Guardar las compras en el estado
      } catch (error) {
        console.error(error.message);
      }
    };

    if (user) {
      fetchUserPurchases();
    }
  }, [user]);

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div className="user-purchases">
      <h2>Mis Compras</h2>
     
    </div>
  );
};

export default UserPurchases;
