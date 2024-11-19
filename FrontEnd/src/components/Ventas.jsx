import React, { useEffect, useState } from "react";
import "../styles/Ventas.css"; // Estilos opcionales

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:4002/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar las ventas");
        }

        const data = await response.json();
        setVentas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  if (loading) {
    return <p>Cargando ventas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="ventas-container">
      <h2>Listado de Ventas</h2>
      {ventas.length > 0 ? (
        <ul className="ventas-list">
          {ventas.map((order) => (
            <li key={order.id} className="ventas-item">
              <div className="venta-header">
                <p>
                  <strong>Usuario:</strong> {order.user.email}
                </p>
                <p>
                  <strong>Fecha:</strong> {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total con descuento:</strong> ${order.finalPriceWithDiscount?.toFixed(2) || order.finalPrice.toFixed(2)}
                </p>
              </div>
              <ul className="venta-items">
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    Producto: {item.product.description} - Cantidad: {item.quantity} - Precio: ${item.finalPrice.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron ventas registradas.</p>
      )}
    </div>
  );
};

export default Ventas;
