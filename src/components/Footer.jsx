import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className='logo-text'>BLEDLAND</h3>
          <p>A Moroccan streetwear brand redefining identity and urban culture.<br></br> Made for those who wear their roots with pride.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#story">Our Story</a></li>
            <li><a href="#drop">First Drop</a></li>
            <li><a href="#cities">Cities</a></li>
            <li><a href="#newsletter">Newsletter</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/bledland.ma" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@meanrow1" className="social-link">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://x.com/BledLand_ma" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https//service.bledland@gmail.com" className="social-link">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: service.bledland@gmail.com</p>
          <p>Nador, Morocco</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 BledLand. All rights reserved. Crafted with passion in Morocco.</p>
      </div>
    </footer>
  );
};

export default Footer;