import React from "react";
import Carousel from "./Carousel";
import Footer from "./Footer";

import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <Carousel />
     <Footer />
    </div>
  );
};

export default Home;
