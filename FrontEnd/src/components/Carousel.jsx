import React, { useState } from "react";
import "../styles/Home.css";

const Carousel = () => {
  const images = [
    "/images/OFERTA10.jpeg",
    "/images/OFERTA20.jpeg",
    "/images/Stock.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} />
        ))}
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? "active" : ""}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
