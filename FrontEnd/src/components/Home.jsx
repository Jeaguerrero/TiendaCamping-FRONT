import React from "react";
import Carousel from "./Carousel";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Título principal */}
      <div className="home-header">
        <h1 className="home-title">Tienda de Camping</h1>
      </div>

      {/* Componente del carrusel */}
      <Carousel />

      {/* Otros componentes de la página */}
    </div>
  );
};

export default Home;
