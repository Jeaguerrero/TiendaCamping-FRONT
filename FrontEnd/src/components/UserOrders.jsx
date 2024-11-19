import React, { useEffect, useState } from "react";
import "../styles/UserOrders.css"; // Asegúrate de que esta ruta sea correcta

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Obtener el token
        const response = await fetch("http://localhost:4002/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar las órdenes");
        }

        const data = await response.json();
        setOrders(data); // Guardar las órdenes en el estado
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Cargando tus compras...</div>;
  }

  return (
    <div className="mis-compras">
      <h2>Mis Compras</h2>
      {orders?.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Total sin descuento:</strong> ${order.finalPrice?.toFixed(2)}
            </p>
            {order.discountPercentage ? (
              <>
                <p>
                  <strong>Descuento aplicado:</strong>{" "}
                  {order.discountPercentage}% 
                </p>
                <p>
                  <strong>Total con descuento:</strong> $
                  {order.finalPriceWithDiscount?.toFixed(2)}
                </p>
              </>
            ) : (
              <p><strong>No se aplicaron descuentos.</strong></p>
            )}
            <p>
              <strong>Cantidad de Productos:</strong> {order.count}
            </p>
            {order.orderItems && order.orderItems.length > 0 ? (
              <ul>
                {order.orderItems.map((item) => (
                  <li key={item.id}>
                    {item.product.description} - {item.quantity} x $
                    {item.product.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay productos en esta orden.</p>
            )}
          </div>
        ))
      ) : (
        <p>No tienes compras registradas.</p>
      )}
    </div>
  );
};

export default UserOrders;
