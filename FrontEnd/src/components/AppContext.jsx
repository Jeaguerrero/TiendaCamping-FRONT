import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Estado de los productos

  const refreshProducts = async () => {
    try {
      const response = await fetch("http://localhost:4002/api/v1/products");
      const data = await response.json();
      setProducts(data);
      console.log("Productos actualizados:", data);
    } catch (error) {
      console.error("Error al actualizar los productos:", error);
    }
  };

  return (
    <AppContext.Provider value={{ products, refreshProducts }}>
      {children}
    </AppContext.Provider>
  );
};
