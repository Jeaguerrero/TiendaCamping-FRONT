import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Contactanos</h3>
        <ul>
          <li>📞 011 - 45698896</li>
          <li>📧 info@aventuraextrema.com.ar</li>
          <li>📍 Tucumán 1203, Buenos Aires, Argentina</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Redes Sociales</h3>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="https://x.com/?lang=es" target="_blank" rel="noopener noreferrer">
            <img src="/images/twitter-icon.png" alt="Twitter " />
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h3>Horarios de Atención</h3>
        <ul>
          <li>Lunes a Viernes: 9:00 - 18:00</li>
          <li>Sábados: 10:00 - 14:00</li>
          <li>Domingos: Cerrado</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;